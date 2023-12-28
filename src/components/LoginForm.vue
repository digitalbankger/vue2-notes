<template>
  <div class="flex flex-col items-start">
    <h2 class="font-mont font-medium text-5xl mb-4">Вход в ваш аккаунт</h2>
    <ValidationObserver 
      class="w-[100%] text-left"
    >
        <form 
          @submit.prevent="handleLogin"
          class=" flex flex-col"
        >
            <div class="form-group">
              <label for="email" class="font-mont text-lg text-lead pb-2 px-4">Email</label>
              <ValidationProvider 
                  rules="required" 
                  name="email" 
                  v-slot="{ errors }"
              >
                <input v-model="email" type="email" class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2" placeholder="Введите Email" />
                <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
                <label for="password" class="font-mont text-lg text-lead pb-2 px-4">Пароль</label>
                <ValidationProvider 
                  rules="required" 
                  name="password" 
                  v-slot="{ errors }"
                >
                  <input v-model="password" type="password" class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2" placeholder="Введите пароль" />
                  <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="flex flex-row justify-between">
                <p class="font-mont text-lg text-lead py-2 px-4">
                  У вас нет аккаунта? 
                  <span 
                    class="text-salad cursor-pointer hover:text-white"
                    @click="changeModalState"
                  >
                    Зарегистрируйтесь
                  </span>
                </p>
                <button 
                  class="flex flex-row justify-center items-center gap-2 rounded-[50px] px-4 py-2 bg-salad font-mont font-medium text-xl"
                  :disabled="loading"
                >
                  <span 
                    v-show="loading" 
                    class="spinner-border spinner-border-sm"
                  >
                  </span>
                  <span>Войти</span>
                </button>
            </div>
            <div class="form-group">
              <div
                v-if="message" 
                class="alert alert-danger font-mont text-sm bg-red-400/10 px-4 py-2 rounded-[50px] mt-3 text-red-400" 
                role="alert"
              >
                {{ message.join(', ') }}
              </div>
            </div>
        </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginPage",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Это поле обязательно!"),
      password: yup.string().required("Это поле обязательно!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      email: "",
      password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/user");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    changeModalState() {
      this.$emit('change-reg')
    }
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

</style>
  