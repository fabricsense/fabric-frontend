<template>
  <div class="border border-gray-200 rounded-lg bg-white">
    <!-- Title -->
    <div class="px-4 py-3 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ categoryName }} - Contains {{ productCount }} {{ productCount === 1 ? 'Product Type' : 'Product Types' }}
      </h3>
    </div>

    <!-- Main Collapsible Container (Category Variant) -->
    <CollapsibleItem
      ref="mainCollapsible"
      variant="category"
      :name="categoryName"
      :icon="categoryIcon"
      :productCount="productCount"
      :text="categoryDescription"
      :rate="totalRate"
      :defaultOpen="defaultOpen"
      @copy="handleCopy"
      @delete="handleDelete"
    >
      <!-- Inner Product Items (Default Variant) -->
      <div class="space-y-2">
        <CollapsibleItem
          v-for="(product, index) in products"
          :key="index"
          variant="default"
          :name="product.name"
          :icon="product.icon"
          :text="product.text"
          :rate="product.rate"
          :defaultOpen="false"
          @close="() => handleRemoveProduct(index)"
        >
          <!-- Product details can be added here later -->
          <div class="text-sm text-gray-500">
            {{ __('Product details will be added here') }}
          </div>
        </CollapsibleItem>
      </div>

      <!-- Add Another Product Button -->
      <AddAnotherProductButton
        :categoryName="categoryName"
        @click="toggleProductSelector"
      />

      <!-- Product Type Selector (shown when button is clicked) -->
      <div v-if="showProductSelector" class="mt-3">
        <ProductTypeSelector
          :products="productTypes"
          @select="handleProductTypeSelect"
        />
      </div>
    </CollapsibleItem>

    <!-- Summary Footer (Outside collapsible, at bottom of container) -->
    <SummaryFooter
      :totalProducts="totalProducts"
      :totalFabric="totalFabric"
      :totalLining="totalLining"
      :totalRate="totalRate"
      :categoryName="categoryName"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CollapsibleItem from '@/components/CollapsibleItem.vue'
import AddAnotherProductButton from '@/components/AddAnotherProductButton.vue'
import SummaryFooter from '@/components/SummaryFooter.vue'
import ProductTypeSelector from '@/components/ProductTypeSelector.vue'

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  categoryIcon: {
    type: [Object, String],
    default: null,
  },
  categoryDescription: {
    type: String,
    default: '',
  },
  productCount: {
    type: [Number, String],
    required: true,
  },
  products: {
    type: Array,
    default: () => [],
    // Each product should have: { name, icon, text, rate }
  },
  totalProducts: {
    type: [Number, String],
    default: 0,
  },
  totalFabric: {
    type: [Number, String],
    default: '0m',
  },
  totalLining: {
    type: [Number, String],
    default: '0m',
  },
  totalRate: {
    type: [Number, String],
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: true,
  },
  productTypes: {
    type: Array,
    default: () => [],
    // Array of available product types: [{ name, icon }, ...]
  },
})

const emit = defineEmits(['copy', 'delete', 'addProduct', 'removeProduct', 'productTypeSelected'])

const mainCollapsible = ref(null)
const showProductSelector = ref(false)

function handleCopy() {
  emit('copy')
}

function handleDelete() {
  emit('delete')
}

function toggleProductSelector() {
  showProductSelector.value = !showProductSelector.value
}

function handleProductTypeSelect(product, index) {
  emit('productTypeSelected', product, index)
  // Optionally hide the selector after selection
  showProductSelector.value = false
}

function handleRemoveProduct(index) {
  emit('removeProduct', index)
}
</script>

