export interface Todo {
  title: string;
  done: boolean;
}

const STORAGE_KEY = "vue-todo-ts-v1";

export const storage = {
  save(todoItems: Array<Todo>) {
    const parsed: string = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): Array<Todo> {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    return JSON.parse(todoItems);
  },
};

export type Optional<T> = T | null;
