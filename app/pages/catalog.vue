<template>
  <main>
    <section class="catalog">
      <h1 class="catalog__title">КАТАЛОГ</h1>
      <template v-for="product in products" :key="product.id">
        <Card :product="product" />
      </template>

      <LoadingBlock :can-load="canLoad" :has-error="!!error" v-model="pending"
        @load-products="loadProducts(pagination.currentPage + 1)"
        @reload-products="loadProducts(pagination.currentPage)" class="catalog__loading-block" />
    </section>
  </main>
</template>

<script setup lang="ts">
import type { IProduct, IProductResponse } from '~/interfaces/Product';

const products = ref<IProduct[]>([]);
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
});

const canLoad = computed(() : boolean =>
  pagination.value.currentPage < pagination.value.totalPages
);

const page = ref<number>(1);
const { data, pending, error, refresh } = await useAsyncData<IProductResponse>(
  'products',
  () => $fetch(
    'https://test-task-api.tapir.ws/products',
    {
      query: { page: page.value }
    }
  )
)
if (data.value) {
  products.value.push(...data.value.products);
  pagination.value.totalPages = data.value.totalPages;
}
watch(data, (newData) => {
  if (!newData) return

  pagination.value.totalPages = newData.totalPages;
  products.value.push(...newData.products);
});


const loadProducts = async (newPage: number) => {
  if (pending.value) return

  page.value = newPage;
  pagination.value.currentPage = newPage;

  await refresh();
}
</script>