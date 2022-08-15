import { IVuexStateHolder, IVuexObservable } from './Domain';

export class VuexObservable<T> implements IVuexObservable<T> {
  subscriberList: ((state: T) => void)[] = [];

  constructor(private stateMutator: IVuexStateHolder<T>) {}
  // subscribe(subscriber: (state: T) => void): void {
  //   this.subscriberList.push(subscriber);
  // }

  // unsubscribe(subscriber: (state: T) => void): void {
  //   const index = this.subscriberList.indexOf(subscriber);
  //   if (index > -1) {
  //     this.subscriberList.splice(index, 1);
  //   }
  // }

  get state(): T {
    return this.stateMutator.state;
  }

  onChangeState<S>(state: Partial<S | T>, mutation?: string): void {
    if (!mutation) {
      this.stateMutator.onChangeState(state);
    } else {
      this.stateMutator.onChangeState(state, mutation);
    }
  }

  onResetState() {
    this.stateMutator.onResetState();
  }

  toJSON() {
    return { ...this };
  }
}
