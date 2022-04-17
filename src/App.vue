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
          @toggle="toggleTodoItemComplete"
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
import { storage, Todo } from "@/utils";

export default Vue.extend({
  components: {
    TodoInput,
    TodoListItem,
  },
  data() {
    return {
      todoText: "",
      todoItems: [] as Array<Todo>,
    };
  },

  methods: {
    toggleTodoItemComplete(todoItem: Todo, index: number): void {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done,
      });

      storage.save(this.todoItems);
    },

    updateTodoText(value: string): void {
      this.todoText = value;
    },

    addTodoItem(): void {
      const value = this.todoText;
      this.todoItems.push({ title: value, done: false });
      storage.save(this.todoItems.sort(this.sortTodo));
      this.initTodoText();
    },

    initTodoText(): void {
      this.todoText = "";
    },

    fetchTodoItems(): void {
      this.todoItems = storage.fetch().sort(this.sortTodo);
    },

    sortTodo(a: Todo, b: Todo): number {
      return a.title.localeCompare(b.title);
    },

    removeTodoItem(index: number): void {
      console.log("remove", index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems.sort(this.sortTodo));
    },
  },
  created() {
    this.fetchTodoItems();
  },
});
</script>

<style scoped></style>
