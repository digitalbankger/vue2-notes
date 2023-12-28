<template>
  <div>
    <div class="container h-screen flex justify-center items-center relative mt-40">
      <TableNotes />
    </div>
    <button 
      @click="openModal"
      class="flex justify-center items-center font-mont fixed bottom-10 right-10 w-[50px] h-[50px] bg-salad rounded-[100%]"
    >
      <img src="@/assets/icon/plus.svg" />
    </button>
  </div>
</template>

<script>
import TableNotes from '@/components/TableNotes.vue';

export default {
    data() {
        return {
            user: null,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/");
        }
        else {
            this.loadUserInfo();
        }
    },
    methods: {
        loadUserInfo() {
            this.$store.dispatch("auth/getUserInfo")
                .then((response) => {
                this.user = response.data;
            })
                .catch((error) => {
                alert("Произошла ошибка при получении данных, обратитесь к администратору:", error);
            });
        },
        logout() {
            this.$store.dispatch("auth/logout")
                .then(() => {
                this.$router.push("/");
            })
                .catch((error) => {
                console.error("Ошибка при попытке выхода:", error);
            });
        },
        openModal() {
            this.$emit('open-modal');
        },
    },
    components: { TableNotes }
}

</script>
