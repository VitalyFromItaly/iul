import PresenterCatcher from '../core/decorators/PresenterCatcher';
import Service from './Service';
import type { IPresenter, TState, IService, TFormData } from './Domain';
import { EModal } from './Domain';
import { VuexObservable } from '~/business/core/store/VuexObservable';
import { IVuexStateHolder } from '~/business/core/store/Domain';

export default class Presenter extends VuexObservable<TState> implements IPresenter {
  private readonly service: IService;

  constructor(stateMutator: IVuexStateHolder<TState>) {
    super(stateMutator);
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

  public onOpenSidebar(sidebarName: EModal): void {
    this.onChangeState({ modalShown: sidebarName });
  }

  @PresenterCatcher()
  public async onSearchSubmit(): Promise<void> {
    const response = await this.service.search(this.state.form);
    console.log({ response });
  }

  public onResetForm(): void {
    this.onChangeState({ form: {} });
  }
}
