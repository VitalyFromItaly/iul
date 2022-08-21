import Service from './Service';
import type { IPresenter, TState, IService, TFormData, TModal, TModalButton } from './Domain';
import { EModal } from './Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { EEventBusName, IEventBus } from '~/core/bus/Domain';
import { context } from '~/core/context';
import { EQueryResultState, TNotificationPayload } from '~/@types/domain';
import { EHttpCodes } from '~/@types/http';

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

  private onOpenModal(modal: EModal): void {
    this.onChangeState({ modalShown: modal });
  }

  public onCloseModal(): void {
    this.onChangeState({ modal: { data: null, shown: EModal.NONE } });
  }

  @PresenterCatcher()
  public async onSearchSubmit(): Promise<void> {
    const { form } = this.state;
    const response = await this.service.search(form);
    this.onChangeState({ lastQuery: response });
    const { res: result } = response;
    this.onQueryResult(result);
  }

  private onQueryResult(result: EQueryResultState): Promise<void> {
    const buttons: TModalButton[] = [
      {
        variant: 'danger',
        text: 'Закрыть',
        method: {
          type: 'presenter',
          name: 'onCloseModal'
        }
      },
      {
        variant: 'outline-primary',
        text: 'Отправить заново',
        method: {
          type: 'presenter',
          name: 'onSearchSubmit'
        }
      }
    ];
    if (result === EQueryResultState.NEVER) {
      this.onSubmitQuery();

      buttons.push({
        variant: 'primary',
        text: 'Журнал',
        method: {
          type: 'router',
          name: 'push',
          params: { name: 'journal' }
        }
      });
      const modal: TModal = {
        shown: EModal.QUERY_INFO,
        data: {
          header: 'Новый запрос',
          data: this.state.lastQuery,
          buttons
        }
      };
      this.onChangeState({ modal });
      return;
    }

    if (result === EQueryResultState.PENDING) {
      const pendingButtons: TModalButton[] = [
        {
          variant: 'outline-primary',
          text: 'Журнал',
          method: {
            type: 'router',
            name: 'push',
            params: { name: 'journal-id', params: { id: this.state.lastQuery.q_id } }
          }
        },
        {
          variant: 'primary',
          text: 'Результат',
          method: {
            type: 'router',
            name: 'push',
            params: { name: 'result-id', params: { id: this.state.lastQuery.q_id } }
          }
        }
      ];
      buttons.push(...pendingButtons);
      const modal: TModal = {
        shown: EModal.QUERY_INFO,
        data: {
          header: 'Запрос уже существует',
          data: this.state.lastQuery,
          buttons
        }
      };
      this.onChangeState({ modal });
    }

    if (result === EQueryResultState.DONE) {
      this.onChangeState({ modalShown: EModal.QUERY_INFO });
    }
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
}
