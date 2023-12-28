<template>
    <div class="section z-40 relative header">
        <div class="container flex flex-row justify-between items-center py-5">    
            <img 
                alt="Company name" 
                src="@/assets/icon/logo.svg"
                width="200"
            />   
            <button 
                v-if="!loggedIn" 
                class="flex flex-row justify-center items-center gap-2 rounded-[50px] px-4 py-2 bg-salad font-mont font-medium text-xl"
                @click="openModal"
            >
                <img 
                    src="@/assets/icon/login.svg"
                    width="25"
                />
                Вход
            </button>
            <div 
                v-else
                class="flex flex-row items-center gap-3"
            >
                <span class="font-mont text-lg font-normal">{{ currentUser.email }}</span>
                <div 
                    class="bg-dark-middle rounded-[100%] w-[50px] h-[50px] flex justify-center items-center relative cursor-pointer"
                    @click="toggleDrop"
                >
                    <img 
                        src="@/assets/icon/user.svg"
                        width="20"
                    />
                    <div 
                        v-if="isDropOn" 
                        class="drop absolute flex justify-center items-center bg-center bg-cover w-[145px] h-[108px] top-[100%] right-[0px]"
                    >
                        <span 
                            class="font-mont text-base font-normal text-salad hover:text-white cursor-pointer mb-3"
                            @click="logOut"
                        >
                            Выйти
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainNavigation',
    data() {
        return {
            isDropOn: false,
        }
    },
    methods: {
        openModal() {
            this.$emit('open-modal');
        },
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },
        toggleDrop() {
            this.isDropOn = !this.isDropOn;
        },
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
}
</script>

<style scoped>
.drop {
    background-image: url('@/assets/icon/profile-back.svg');
}
.header {
  background-color: #0A1F38;
}
</style>
  