import Service from './Service';
import Model from './Model';
import type { IPresenter, TState, IService, TMountPayload } from './Domain';
import PresenterCatcher from '~/core/decorators/PresenterCatcher';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;
  private readonly model: Model;
  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);

    this.service = new Service();
    this.model = new Model();
  }

  @PresenterCatcher()
  async onMounted(payload: TMountPayload): Promise<void> {
    this.onChangeState({ ...payload });
    const rawResult = await this.service.readOne(this.state.id);
    if (!rawResult || !rawResult.length) { return; }
    const results = this.model.setAttributeImages(rawResult);
    this.onChangeState({ results });
  }
}
