<template>
  <div>
    <div>
      <p v-if="name" class="text-white cursor-pointer" @click="isMenuShown = !isMenuShown">
        {{ name }}
      </p>
      <div v-if="isMenuShown" class="w-40 absolute text-header rounded-md px-2 py-0.5 bg-white z-50 right-5 top-12">
        <div class="py-1 text-right w-full">
          <b-button
            class="w-full"
            :class="{ 'cursor-not-allowed': isDisabled }"
            :disabled="isDisabled"
            variant="secondary"
            size="sm"
            @click="onLogout"
          >
            Выйти
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import type { TState, IPresenter } from '../Domain';
import { userStoreModule } from '../store';

@Component
export default class User extends Vue {
  @userStoreModule.State('internalState') state: TState;

  isMenuShown = false;
  isDisabled = false;

  private presenter: IPresenter;

  private get name(): string {
    return this.state.user?.name || '';
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.userInstance;

    await this.presenter.onLoad();
  }

  private onLogout(): void {
    this.presenter.onLogout();
  }
}
</script>
