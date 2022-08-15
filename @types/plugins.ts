// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IPresenterPlugin } from '~/plugins/presenter';
import { IBrowserStorage } from '~/core/cache/Domain';
declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    // $api: IApi;
    // $http: IFetchAdapter;
    // $auth: IAuth;
    // $bus: IEventBus;
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    // $notification: INotificationService;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    // $api: IApi;
    // $http: IFetchAdapter;
    // $auth: IAuth;
    // $bus: IEventBus
    // $cacheClient: Socket;
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    // $notification: INotificationService;
  }
  interface Context {
    // $api: IApi;
    // $http: IFetchAdapter;
    // $auth: IAuth;
    // $bus: IEventBus;
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    // $notification: INotificationService;
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  interface Store<S> {
    // $api: IApi;
    // $http: IFetchAdapter;
    // $bus: IEventBus;
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    // $auth: IAuth;
    // $cacheClient: Socket;
    // $rabbit: (channel: string, options?: any) => Ws;
    // $notification: INotificationService;
  }
}
