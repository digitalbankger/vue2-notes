<template>
  <div>
    <header class="fixed w-[100%] z-50">
      <MainNavigation />
    </header>
    <main class="flex justify-center">
      <router-view 
        @open-modal="openModal"
        :key="changeNote" 
      />
      <ModalWin 
        v-if="modalVisible" 
        @close-modal="closeModal"
      >
        <AddNote 
          @close-modal="closeModal" 
          @note-added="refreshData"
        />
      </ModalWin>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import MainNavigation from '@/components/MainNavigation.vue'
import AddNote from '@/components/AddNote.vue';
import ModalWin from '@/components/ModalWin.vue';

export default {
  name: 'PuplicLayout',
  components: {
    MainNavigation,
    ModalWin,
    AddNote
  },
  data() {
    return {
      modalVisible: false,
      changeNote: 0
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    refreshData() {
      this.changeNote +=1
    }
  },
}
</script>