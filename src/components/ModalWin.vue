<template>
  <div class="bg-over absolute w-[100%] h-full z-30">
    <div class="h-auto w-[780px] bg-modal shadow rounded-[40px] p-[60px] absolute top-[100px] left-1/2 -translate-x-1/2">
      <div class="modal-content">
        <slot></slot>
        <button 
            @click="closeModal"
            class="flex justify-center items-center font-mont absolute top-[20px] right-[20px] w-[50px] h-[50px] bg-salad rounded-[100%]"
        >
            <img src="@/assets/icon/exit.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
        this.$emit('close-modal')
    }
  },
};
</script>

<style scoped>
</style>
  