<template>
  <LayoutHeader>
    <template #left-header>
      <ViewBreadcrumbs v-model="viewControls" routeName="Measurement Sheet" />
    </template>
    <template #right-header>
      <Button
        variant="solid"
        :label="__('Create')"
        iconLeft="plus"
        @click="() => {}"
      />
    </template>
  </LayoutHeader>
  <div class="p-6">
    <CategoryProductContainer
      categoryName="Living Room"
      :categoryIcon="WindowIcon"
      categoryDescription="Window Curtains, Sheer Curtains, Blinds"
      :productCount="3"
      :products="products"
      :productTypes="productTypes"
      :totalProducts="3"
      totalFabric="7.5m"
      totalLining="5m"
      :totalRate="15480.00"
      :defaultOpen="true"
      @copy="handleCopy"
      @delete="handleDelete"
      @addProduct="handleAddProduct"
      @removeProduct="handleRemoveProduct"
      @productTypeSelected="handleProductTypeSelected"
    />
  </div>
</template>

<script setup>
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import CategoryProductContainer from '@/components/CategoryProductContainer.vue'
import { ref } from 'vue'

// Sample icons - you can replace these with actual icon components
// For now, using available icons as placeholders
import DocumentIcon from '@/components/Icons/DocumentIcon.vue'
import SparkleIcon from '@/components/Icons/SparkleIcon.vue'
import FileIcon from '@/components/Icons/FileIcon.vue'
import FileImageIcon from '@/components/Icons/FileImageIcon.vue'

// Using FileImageIcon as placeholder for WindowIcon - replace with actual window icon when available
const WindowIcon = FileImageIcon

const viewControls = ref(null)

// Sample products data
const products = ref([
  {
    name: 'Window Curtains - Front Layer',
    icon: DocumentIcon, // Replace with actual window icon
    text: '30" × 40" • 1 Panel',
    rate: 6263.00,
  },
  {
    name: 'Sheer Curtains - Back Layer',
    icon: SparkleIcon, // Replace with actual sheer icon
    text: '30" × 40" • 1 Panel',
    rate: 4580.00,
  },
  {
    name: 'Roller Blinds - Balcony Door',
    icon: FileIcon, // Replace with actual blind icon
    text: '36" × 60"',
    rate: 4637.00,
  },
])

// Available product types for selection
const productTypes = ref([
  {
    name: 'Window Curtains',
    icon: DocumentIcon, // Replace with actual window icon
  },
  {
    name: 'Sheer Curtains',
    icon: SparkleIcon, // Replace with actual sheer icon
  },
  {
    name: 'Blinds',
    icon: FileIcon, // Replace with actual blinds icon
  },
  {
    name: 'Roller Blinds',
    icon: FileIcon, // Replace with actual roller blinds icon
  },
  {
    name: 'Vertical Blinds',
    icon: FileIcon, // Replace with actual vertical blinds icon
  },
  {
    name: 'Roman Blinds',
    icon: FileIcon, // Replace with actual roman blinds icon
  },
])

function handleCopy() {
  console.log('Copy category')
  // Handle copy action
}

function handleDelete() {
  console.log('Delete category')
  // Handle delete action
}

function handleAddProduct() {
  console.log('Add product')
  // Handle add product action
}

function handleRemoveProduct(index) {
  console.log('Remove product at index:', index)
  products.value.splice(index, 1)
  // Handle remove product action
}

function handleProductTypeSelected(product, index) {
  console.log('Product type selected:', product.name)
  // Handle product type selection - you can add the selected product to the products array
  // For example:
  // products.value.push({
  //   name: product.name + ' - New',
  //   icon: product.icon,
  //   text: '',
  //   rate: 0,
  // })
}
</script>

