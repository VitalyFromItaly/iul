<template>
  <main>
    <div>
      <layout-header />
      <layout-navigation />
      <layout-heading />
      <div class="px-4">
        <nuxt />
      </div>
    </div>

    <layout-global-loading />
    <notifications position="top center" class="mt-2" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { TNotificationPayload, TRouteEventPayload } from '~/@types/domain';
import { EEventBusName } from '~/core/bus/Domain';

@Component
export default class DefaultLayout extends Vue {
  public mounted(): void {
    this.onEvents();
  }

  private onEvents(): void {
    this.onNotificationEvent();
    this.onRouteChange();
  }

  private onRouteChange(): void {
    this.$bus.on(EEventBusName.ROUTER, (payload: TRouteEventPayload) => {
      const { name, params } = payload;
      const routePayload: TRouteEventPayload = { name };
      if (params) { routePayload.params = params; }
      this.$router.push(routePayload);
    });
  }

  private onNotificationEvent(): void {
    this.$bus.on(EEventBusName.NOTIFICATION, (payload: TNotificationPayload) => {
      const { type, title, text } = payload;
      this.$notification({ title: title || '', text, type });
    });
  }
}
</script>
