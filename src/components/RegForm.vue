<template>
  <div class="flex flex-col items-start">
    <h2 class="font-mont font-medium text-5xl mb-4">Регистрация</h2>
    <ValidationObserver class="w-[100%] text-left">
      <form @submit.prevent="handleRegistration" class="flex flex-col">
        <div class="form-group">
          <label for="email" class="font-mont text-lg text-lead pb-2 px-4">Email</label>
          <ValidationProvider rules="required|email" name="email" v-slot="{ errors }">
            <input
              v-model="email"
              type="email"
              class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2"
              placeholder="Введите Email"
            />
            <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="password" class="font-mont text-lg text-lead pb-2 px-4">Пароль</label>
          <ValidationProvider rules="required|min:4" name="password" v-slot="{ errors }">
            <input
              v-model="password"
              type="password"
              class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2"
              placeholder="Введите пароль"
            />
            <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
            <label for="confirm_password" class="font-mont text-lg text-lead pb-2 px-4">Подтвердите пароль</label>
            <ValidationProvider rules="required" name="confirm_password" v-slot="{ errors }">
                <input
                  v-model="confirm_password"
                  type="password"
                  class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2"
                  placeholder="Подтвердите пароль"
                />
                <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="flex flex-row justify-between">
          <p class="font-mont text-lg text-lead py-2 px-4">
            У вас уже есть аккаунт? 
            <span 
                @click="changeModalState"
                class="text-salad cursor-pointer"
            >
                Войдите
            </span>
          </p>
          <button
            class="flex flex-row justify-center items-center gap-2 rounded-[50px] px-4 py-2 bg-salad font-mont font-medium text-xl"
            :disabled="loading"
          >
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Зарегистрироваться</span>
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
  name: "RegistrationPage",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Это поле обязательно!").email("Невалидный адрес электронной почты"),
      password: yup.string().required("Это поле обязательно!").min(4, "Пароль не может быть короче 4 символов"),
      confirm_password: yup
        .string()
        .required("Это поле обязательно!")
        .test("passwords-match", "Пароли не совпадают", function (value) {
          return value === this.parent.password;
        }),
    });

    return {
      loading: false,
      message: "",
      schema,
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleRegistration() {
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };

      this.$store.dispatch("auth/register", user).then(
        () => {
          this.$router.push("/user");
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
        this.$emit('change-login')
    }
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
</style>
  