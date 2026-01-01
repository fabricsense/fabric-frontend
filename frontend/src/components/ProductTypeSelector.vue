<template>
  <div class="border border-gray-200 rounded-lg bg-white p-4">
    <!-- Title -->
    <h3 class="text-base font-semibold text-gray-900 mb-4">
      {{ __('Select Product Type to Add:') }}
    </h3>

    <!-- Product Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <ProductTypeCard
        v-for="(product, index) in products"
        :key="index"
        :name="product.name"
        :icon="product.icon"
        @click="() => handleProductClick(product, index)"
      />
    </div>
  </div>
</template>

<script setup>
import ProductTypeCard from '@/components/ProductTypeCard.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
    // Each product should have: { name, icon }
  },
})

const emit = defineEmits(['select'])

function handleProductClick(product, index) {
  emit('select', product, index)
}
</script>

