import Service from './Service';
import { IPresenter, TState, IService } from './Domain';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { EEventBusName, IEventBus } from '~/core/bus/Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
import { context } from '~/core/context';
import { TNotificationPayload } from '~/@types/domain';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;
  private readonly bus: IEventBus;

  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);
    this.bus = context.$bus;
    this.service = new Service();
  }

  @PresenterCatcher()
  public async onLoad(): Promise<void> {
    const user = await this.service.read();

    if (!user) {
      this.bus.emit<TNotificationPayload>(EEventBusName.USER_ERROR, {
        type: 'error',
        text: 'Ошибка при получении юзера'
      });
      return;
    }
    this.onChangeState({ ...user });
  }

  @PresenterCatcher()
  public async onLogout(): Promise<void> {
    await this.service.logout();
  }
}
