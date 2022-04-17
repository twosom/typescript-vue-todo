<template>
  <div>
    <header>
      <h1>Vue Todo with TypeScript</h1>
    </header>
    <main>
      <todo-input :item="todoText" @input="updateTodoText" @add="addTodoItem" />
    </main>
    <div>
      <ul>
        <todo-list-item
          v-for="(todoItem, index) in todoItems"
          :key="index"
          :index="index"
          :todo-item="todoItem"
          @remove="removeTodoItem"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "@/components/TodoInput.vue";
import TodoListItem from "@/components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: Array<any>) {
    const parsed: string = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): any[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    return JSON.parse(todoItems);
  },
};

export default Vue.extend({
  components: {
    TodoInput,
    TodoListItem,
  },
  data() {
    return {
      todoText: "",
      todoItems: [] as any[],
    };
  },

  methods: {
    updateTodoText(value: string): void {
      this.todoText = value;
    },

    addTodoItem(): void {
      const value = this.todoText;
      this.todoItems.push(value);
      storage.save(this.todoItems);
      this.initTodoText();
    },

    initTodoText(): void {
      this.todoText = "";
    },

    fetchTodoItems(): any[] {
      return storage.fetch();
    },

    removeTodoItem(index: number) {
      console.log("remove", index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
  },
  created() {
    this.todoItems = this.fetchTodoItems();
  },
});
</script>

<style scoped></style>
