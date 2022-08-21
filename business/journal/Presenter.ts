import Service from './Service';
import type { IPresenter, TState, IService, TMountPayload } from './Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { context } from '~/core/context';
import { IEventBus } from '~/core/bus/Domain';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;
  private readonly bus: IEventBus;

  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);
    this.bus = context.$bus;
    this.service = new Service();
  }

  @PresenterCatcher()
  async onMounted(payload: TMountPayload): Promise<void> {
    this.onChangeState({ ...payload });
    if (this.state.id) {
      await this.getById();
      return;
    }

    await this.getAll();
  }

  private async getById(): Promise<void> {
    const logs = await this.service.readOne({ q_id: this.state.id });
    this.onChangeState({ logs });
  }

  private async getAll(): Promise<void> {
    const logs = await this.service.readAll();

    this.onChangeState({ logs });
  }
}
