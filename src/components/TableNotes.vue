<template>
  <div class="flex flex-col items-start">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      <div 
        v-for="note in notes" 
        :key="note.id" 
        class="note-container relative overflow-hidden text-left"
      >
        <h3 class="note-header rounded-tl-[10px] bg-salad font-mont font-medium text-lg text-white p-4">{{ note.title }}</h3>
        <p class="bg-salad  font-mont text-base font-normal text-white p-4">{{ note.content }}</p>
        <span 
          class="bg-salad rounded-bl-[10px] rounded-br-[10px] flex flex-row gap-2 justify-end p-4 font-mont cursor-pointer" 
          @click="() => deleteNote(note.id)"
        >
          <img src="@/assets/icon/exit.svg" width="13"/>
          Удалить
        </span>
        </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { deleteNotes, fetchNotes } from "@/api/api.js";

export default {
  name: "NotesList",
  components: {
  },
  setup() {
    const notes = ref([]);

    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        notes.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    const deleteNote = async (noteId) => {
      try {
        await deleteNotes(noteId);
        loadNotes()
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      loadNotes();
    });

    return {
      notes,
      deleteNote
    };
  },
};
</script>

<style scoped>
.note-header {
  border-bottom: 1px solid #0a1f381a;
}
.note-header::before {
  content:"";
  position:absolute;
  top:0;
  right:0;
  border-width:0 26px 26px 0;
  border-style:solid;
  border-bottom-left-radius: 5px;
  border-color:#0a1f38 #0a1f38 #90a40d #90a40d;
  background:#90a40d;
  display:block; width:0;
}
</style>
