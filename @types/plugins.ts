// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { TNotificationPayload } from './domain';
import { IPresenterPlugin } from '~/plugins/presenter';
import { IBrowserStorage } from '~/core/cache/Domain';
import { IEventBus } from '~/core/bus/Domain';
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
    $bus: IEventBus;
    $notification: (payload: TNotificationPayload) => void;
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
    $bus: IEventBus;
    $notification: (payload: TNotificationPayload) => void;

  }
  interface Context {
    // $api: IApi;
    // $http: IFetchAdapter;
    // $auth: IAuth;
    // $bus: IEventBus;
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    $notification: (payload: TNotificationPayload) => void;
    $bus: IEventBus;
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
    $bus: IEventBus;
    $notification: (payload: TNotificationPayload) => void;
    // $auth: IAuth;
    // $cacheClient: Socket;
    // $rabbit: (channel: string, options?: any) => Ws;
    // $notification: INotificationService;
  }
}
