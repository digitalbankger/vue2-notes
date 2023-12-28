<template>
  <div class="flex flex-col items-start">
    <h2 class="font-mont font-medium text-5xl mb-4">Добавление заметки</h2>
    <ValidationObserver class="w-[100%] text-left">
      <form @submit.prevent="addNote" class="flex flex-col">
        <div class="form-group">
            <label for="title" class="font-mont text-lg text-lead pb-2 px-4">Название заметки</label>
            <ValidationProvider 
                rules="required" 
                name="title" 
                v-slot="{ errors }"
            >
                <input v-model="title" type="text" class="block w-[100%] h-[50px] outline-0 bg-white rounded-[50px] font-mont text-lg text-lead p-5 mb-2" placeholder="Введите название" />
                <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="form-group">
          <label for="content" class="font-mont text-lg text-lead pb-2 px-4">Текст заметки</label>
            <ValidationProvider 
                rules="required" 
                name="content" 
                v-slot="{ errors }"
            >
                <textarea v-model="content" :style="{ height: textareaHeight + 'px' }" class="block w-[100%] h-[100px] outline-0 bg-white rounded-[25px] font-mont text-lg text-lead p-5 mb-2" placeholder="Введите текст"></textarea>
                <span class="font-mont text-base text-lead px-4 text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="flex flex-row justify-end w-100">
          <button class="flex flex-row justify-center items-center gap-2 rounded-[50px] px-4 py-2 bg-salad font-mont font-medium text-xl" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Добавить </span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger font-mont text-sm bg-red-400/10 px-4 py-2 rounded-[50px] mt-3 text-red-400" role="alert">
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
import { addNotes} from "@/api/api.js"; 

export default {
  name: "AddNote",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string().required("Это поле обязательно!"),
      content: yup.string().required("Это поле обязательно!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      title: "",
      content: "",
      textareaHeight: 150,
      
    };
  },
  methods: {
    
    async addNote() {
      this.loading = true;

      const note = {
        title: this.title,
        content: this.content,
      };

      try {
        await addNotes(note);
        this.$emit('note-added');
        this.title = "";
        this.content = "";

      } catch (error) {
        console.error(error);
        this.message = "Произошла ошибка при добавлении заметки";
      } finally {
        this.loading = false;
        this.$emit('close-modal')
      }
    },
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
  