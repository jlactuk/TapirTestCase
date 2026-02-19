<template>
    <button class="more__button" @click="showMore">Показать ещё</button>
</template>

<script setup lang="ts">
const emit = defineEmits(["loadMore"])
const showMore = () => {
    emit("loadMore");
}
</script>