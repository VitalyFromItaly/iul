import Service from './Service';
import type { IPresenter, TState, IService, TMountPayload, TRequest } from './Domain';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { IEventBus } from '~/core/bus/Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
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
  public async onMounted(payload: TMountPayload): Promise<void> {
    this.onChangeState({ ...payload });
    let requests: TRequest[] = null;
    const { id } = this.state;
    if (id) {
      requests = await this.service.readOne({ q_id: id });
    } else {
      requests = await this.service.readAll();
    }
    this.onChangeState({ requests });
  }
}
