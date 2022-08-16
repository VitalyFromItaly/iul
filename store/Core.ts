import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  stateFactory: true,
  namespaced: true
})
export default class Core extends VuexModule {
  // gate = {
  //   id: 0,
  //   title: 'Mvideo'
  // };

  // notifications: any = [];
  // breadcrumbs: any = [];
  currentPageName: string = 'Поиск';
  isLoading = true;
  // isButtonsAvaliable = true;
  // isAppLoaded = false;
  // permissions: TPermissions = {
  //   // @ts-ignore
  //   application: {},
  //   document: {},
  //   template: {},
  //   admin: {}
  // };

  // @Mutation
  // addNotifications(payload: any): void {
  //   this.notifications = this.notifications.concat(payload);
  // }

  // @Mutation
  // setPermissions(payload: any): void {
  //   this.permissions = payload;
  // }

  // @Mutation
  // addNotification(payload: any): void {
  //   this.notifications.push(payload);
  // }

  // @Mutation
  // removeNotification(payload: any): void {
  //   const index = this.notifications.indexOf(payload);
  //   this.notifications.splice(index, 1);
  // }

  @Mutation
  setIsLoading(): void {
    this.isLoading = true;
  }

  @Mutation
  setCurrentPageName(name: string): void {
    this.currentPageName = name;
  }

  @Mutation
  removeIsLoading(): void {
    this.isLoading = false;
  }

  // @Mutation
  // setBreadcrumbs(payload: any): void {
  //   this.breadcrumbs = payload;
  // }

  // @Mutation
  // removeBreadcrumbs(): void {
  //   this.breadcrumbs = [];
  // }

  // @Mutation
  // setIsLoadApp(flag: boolean): void {
  //   this.isLoadApp = flag;
  // }
}
