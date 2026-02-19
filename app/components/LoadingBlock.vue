<template>
    <article>
        <ErrorBlock v-if="hasError && !isLoading" @click="reloadProducts" />
        <Loader v-else-if="isLoading" />
        <MoreButton v-else-if="canLoad" @loadMore="loadProducts" />
    </article>
</template>

<script setup lang="ts">
const emit = defineEmits(['loadProducts', 'reloadProducts'])
const isLoading = defineModel();
const props = defineProps<{ canLoad?: boolean; hasError?: boolean }>()
const reloadProducts = () => {
    emit('reloadProducts')
}
const loadProducts = () => {
    emit('loadProducts')
}
const { canLoad, hasError } = toRefs(props);
</script>