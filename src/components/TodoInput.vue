<template>
  <div>
    <label for="todo-input">오늘 할 일 : </label>
    <input id="todo-input" type="text" :value="item" @input="handleInput" />
    <button type="button" @click="addTodo">추가</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    item: {
      type: String,
      required: true,
    },
  },
  methods: {
    addTodo(): void {
      if (this.item) {
        this.$emit("add");
      } else {
        alert("입력값은 필수입니다.");
      }
    },
    handleInput(event: InputEvent) {
      const eventTarget = event.target as HTMLInputElement;
      this.$emit("input", eventTarget.value);
    },
  },
});
</script>

<style scoped></style>
