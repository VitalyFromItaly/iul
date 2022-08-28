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
    $auth: NuxtAxiosInstance;
    $notification: (payload: TNotificationPayload) => void;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    $auth: NuxtAxiosInstance;
    $bus: IEventBus;
    $notification: (payload: TNotificationPayload) => void;

  }
  interface Context {
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $auth: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    $notification: (payload: TNotificationPayload) => void;
    $bus: IEventBus;
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  interface Store<S> {
    $presenter: IPresenterPlugin;
    $axios: NuxtAxiosInstance;
    $cache: IBrowserStorage;
    $auth: NuxtAxiosInstance;
    $bus: IEventBus;
    $notification: (payload: TNotificationPayload) => void;
  }
}
