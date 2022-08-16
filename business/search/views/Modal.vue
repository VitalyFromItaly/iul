<template>
  <b-modal size="lg" centered variant="primary" title="Состояние запроса">
    <p class="my-4">Hello from modal!</p>
     <template #modal-footer="{ ok, cancel, hide }">
      <b>Custom Footer</b>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="ok()">
        OK
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
      <!-- Button with custom close trigger value -->
      <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
        Forget it
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class StateQueryModal extends Vue {

}
</script>
