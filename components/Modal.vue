<template>
  <div v-if="internalShow" @click="clickOutside">
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex mx-16"
    >
      <div class="relative w-auto my-6">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          @click.stop
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t"
          >
            <h3
              class="text-xl font-semibold flex items-baseline justify-center px-3"
            >
              <slot name="header"></slot>
            </h3>
            <button
              class="bg-transparent border-0 text-black opacity-75 float-right text-2xl leading-none font-normal outline-none focus:outline-none"
              @click="$emit('close')"
            >
              <span class="text-black"> × </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <slot name="body"></slot>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end px-2 pb-2 border-t border-solid border-slate-200 rounded-b"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-40 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: 'LargeModal',
  data() {
    return {
      internalShow: true
    };
  },
  destroyed() {
    this.clickOutside();
  },

  methods: {
    clickOutside() {
      this.internalShow = false;
      this.$emit('close');
    }
  }
};
</script>
