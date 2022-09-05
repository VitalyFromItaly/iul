import { Context } from '@nuxt/types';
import { USER_STORE_NS } from '~/business/user/store';

export default function({ store, $presenter }: Context) {
  console.log();
  // If the user is not authenticated
  if (!store.state[USER_STORE_NS].internalState.user) {
    $presenter.userInstance.onLoad();
  }
}
