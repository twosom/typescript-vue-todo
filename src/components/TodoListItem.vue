<template>
  <li>
    <span class="item" :class="todoItemClass" @click="toggleItem"
      >{{ todoItem.title }}
    </span>
    <button type="button" @click="removeItem">삭제</button>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Optional, Todo } from "@/utils";

export default Vue.extend({
  props: {
    todoItem: Object as PropType<Todo>,
    index: Number,
  },
  computed: {
    isDone(): boolean {
      return this.todoItem.done;
    },

    todoItemClass(): Optional<string> {
      return this.isDone ? "complete" : null;
    },
  },

  methods: {
    toggleItem() {
      this.$emit("toggle", this.todoItem, this.index);
    },

    removeItem() {
      this.$emit("remove", this.index);
    },
  },
});
</script>

<style scoped>
.item {
  cursor: pointer;
}

.complete {
  text-decoration: line-through;
}
</style>
