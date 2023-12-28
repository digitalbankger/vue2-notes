<template>
    <div>
      <header>
        <MainNavigation @open-modal="openModal" />
      </header>
      <main class="flex justify-center">
          <router-view />            
          <ModalWin 
              v-if="modalVisible" 
              @close-modal="closeModal"
          >
            <template v-if="isLoginState">
              <LoginForm @change-reg="stateReg"/>
            </template>

            <template v-else>
              <RegForm @change-login="stateLogin"/>
            </template>
          </ModalWin>
      </main>
      <footer>
      </footer>
    </div>
</template>
  
<script>
import MainNavigation from '@/components/MainNavigation.vue'
import ModalWin from "@/components/ModalWin.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegForm from '@/components/RegForm.vue';

export default {
    name: 'PuplicLayout',
    components: {
    MainNavigation,
    ModalWin,
    LoginForm,
    RegForm
},
    data() {
      return {
        modalVisible: false,
        isLoginState: true
      };
    },
    methods: {
      openModal() {
        this.modalVisible = true;
      },
      closeModal() {
        this.modalVisible = false;
      },
      stateReg() {
        this.isLoginState=false;
      },
      stateLogin() {
        this.isLoginState=true;
      }
    },
}
</script>