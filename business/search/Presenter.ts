import cloneDeep from 'lodash/cloneDeep';
import Service from './Service';
import type { IPresenter, TState, IService, TFormData, TModal, TModalButton } from './Domain';
import { EModal } from './Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { EEventBusName, IEventBus } from '~/core/bus/Domain';
import { EQueryExistence, EQueryResultState, TNotificationPayload } from '~/@types/domain';
import { EHttpCodes } from '~/@types/http';

import { context } from '~/core/context';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;
  private readonly bus: IEventBus;
  private readonly buttons: TModalButton[] = [
    {
      variant: 'danger',
      text: 'Закрыть',
      method: {
        type: 'presenter',
        name: 'onCloseModal'
      }
    }
    // {
    //   variant: 'outline-primary',
    //   text: 'Отправить заново',
    //   method: {
    //     type: 'presenter',
    //     name: 'onSearchSubmit'
    //   }
    // }
  ];

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

  private onOpenModal(modal: EModal): void {
    this.onChangeState({ modalShown: modal });
  }

  public onCloseModal(): void {
    this.onChangeState({ modal: { data: null, shown: EModal.NONE } });
  }

  @PresenterCatcher()
  public async onSearchSubmit(form?: TFormData): Promise<void> {
    const queryData = form || this.state.form;
    if (form) {
      this.onChangeState({ form });
    }

    const response = await this.service.search(queryData);
    const { res: result, q_state: queryState } = response;
    this.onChangeState({ lastQuery: response, result, queryState });
    this.onQueryResult();
  }

  private onQueryResult(): Promise<void> {
    const { result } = this.state;
    if (result === EQueryExistence.NO) {
      this.onSubmitQuery();

      const modal: TModal = {
        shown: EModal.QUERY_INFO,
        data: {
          header: 'Новый запрос',
          data: this.state.lastQuery,
          buttons: this.buttons
        }
      };
      this.onChangeState({ modal });
      return;
    }

    if (result === EQueryExistence.YES) {
      this.defineModalFromExistQuery();
    }
  }

  private defineModalFromExistQuery(): void {
    const { queryState } = this.state;
    const buttons = cloneDeep(this.buttons);
    const isProcessed = queryState === EQueryResultState.PROCESSED;
    if (isProcessed) {
      buttons.push({
        variant: 'primary',
        text: 'Результат',
        method: {
          type: 'router',
          name: 'push',
          params: { name: 'result-id', params: { id: this.state.lastQuery.q_id } }
        }
      });
    }

    const modal: TModal = {
      shown: EModal.QUERY_INFO,
      data: {
        header: isProcessed ? 'Запрос выполнен' : 'Запрос уже существует',
        data: this.state.lastQuery,
        buttons
      }
    };
    this.onChangeState({ modal });
  }

  public async onSubmitQuery(): Promise<void> {
    const status = await this.service.submitQuery(this.state.form);

    if (status !== EHttpCodes.SUCCESS) {
      this.bus.emit<TNotificationPayload>(EEventBusName.NOTIFICATION, {
        type: 'error',
        text: 'Ошибка при подтверждении запроса'
      });
    }
  }

  public onResetForm(): void {
    this.onChangeState({ form: {} });
  }

  public onResetModal(): void {
    this.onChangeState({
      modal: {
        data: null,
        shown: EModal.NONE
      }
    });
  }

  public onSaveFormInCache(form: TFormData): void {
    this.service.saveFormInCache(form);
  }

  public getCachedForm(): TFormData {
    const form = this.service.getFormFromCache();
    if (form) { return form; }
    return {} as TFormData;
  }
}
