---
to: business/<%= section %>/<%= name %>/Presenter.ts
---
import Service from './Service';
import { IPresenter, TState, IService, TMountPayload } from './Domain';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';
import { context } from '~/core/context';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;

  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);

    const { swagger } = context.$api;

    this.service = new Service(swagger);
  }

  async onMounted(payload: TMountPayload): Promise<void> {
    this.onChangeState({ ...payload, isLoading: true });
    const { data: { data } } = await this.service.read(this.state.documentId);
    this.onChangeState({ data, isLoading: false });
  }
}
