import PresenterCatcher from '../core/decorators/PresenterCatcher';
import Service from './Service';
import type { IPresenter, TState, IService, TFormData } from './Domain';
import { EModal, EQueryResult } from './Domain';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { EEventBusName, IEventBus } from '~/core/bus/Domain';
import { TNotificationPayload } from '~/@types/domain';
import { context } from '~/core/context';
export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;
  private readonly bus: IEventBus;

  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);
    this.bus = context.$bus;
    this.service = new Service();
  }

  @PresenterCatcher()
  public async onMounted(): Promise<void> {
    await this.getCountryDictionary();
  }

  public onFormChanged(form: TFormData): void {
    this.onChangeState({ form });
  }

  private async getCountryDictionary(): Promise<void> {
    const countries = await this.service.fetchCountryDictionary();
    this.onChangeState({ countries });
  }

  public onOpenSidebar(modal: EModal): void {
    this.onChangeState({ modalShown: modal });
  }

  @PresenterCatcher()
  public async onSearchSubmit(): Promise<void> {
    const { form } = this.state;
    const response = await this.service.search(form);
    const { res: result } = response;
    this.onQueryResult(result);
  }

  private async onQueryResult(result: EQueryResult): Promise<void> {
    console.log({ result });
    if (result === EQueryResult.NEVER) {
      this.bus.emit<TNotificationPayload>(EEventBusName.NOTIFICATION, {
        type: 'success',
        title: 'Новый запрос',
        text: 'Данный запрос помещен в режим ожидания'
      });

      await this.onSubmitQuery();
      return;
    }

    if (result === EQueryResult.PENDING) {
      this.bus.emit<TNotificationPayload>(EEventBusName.NOTIFICATION, {
        type: 'success',
        title: '',
        text: 'Данный запрос помещен в режим ожидания'
      });
    }

    if (result === EQueryResult.EXIST) {
      this.onChangeState({ modalShown: EModal.FOUND_QUERY });
    }
  }

  public async onSubmitQuery(): Promise<void> {
    const response = await this.service.submitQuery(this.state.form);
    console.log({ response });
  }

  public onResetForm(): void {
    this.onChangeState({ form: {} });
  }
}
