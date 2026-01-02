<template>
  <div class="bg-gray-50 rounded-lg p-4 space-y-4">
    <!-- Top Row: Dropdown Fields -->
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="mb-2 block text-xs font-medium text-gray-700 uppercase">LAYER</label>
        <FormControl
          type="select"
          v-model="formData.layer"
          :options="layerOptions"
          placeholder="Select Layer"
        />
      </div>
      <div>
        <label class="mb-2 block text-xs font-medium text-gray-700 uppercase">TRACK TYPE</label>
        <FormControl
          type="select"
          v-model="formData.trackType"
          :options="trackTypeOptions"
          placeholder="Select Track Type"
        />
      </div>
      <div>
        <label class="mb-2 block text-xs font-medium text-gray-700 uppercase">OPENING</label>
        <FormControl
          type="select"
          v-model="formData.opening"
          :options="openingOptions"
          placeholder="Select Opening"
        />
      </div>
    </div>

    <!-- Bottom Row: Three Sections -->
    <div class="grid grid-cols-3 gap-4">
      <!-- Dimensions Section -->
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center gap-2 mb-3">
          <FeatherIcon name="ruler" class="h-5 w-5 text-yellow-600" />
          <h3 class="text-sm font-semibold text-gray-900">Dimensions</h3>
        </div>
        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">WIDTH</label>
            <FormControl
              type="number"
              v-model="formData.width"
              placeholder="0.000"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">HEIGHT</label>
            <FormControl
              type="number"
              v-model="formData.height"
              placeholder="0.000"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">PANELS</label>
            <FormControl
              type="number"
              v-model="formData.panels"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <!-- Materials Section -->
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center gap-2 mb-3">
          <FeatherIcon name="package" class="h-5 w-5 text-blue-600" />
          <h3 class="text-sm font-semibold text-gray-900">Materials</h3>
        </div>
        <div class="space-y-2">
          <div class="text-sm text-gray-700">
            <span class="font-medium">Fabric:</span> A class (2.5m) <span class="font-semibold">₹1,413</span>
          </div>
          <div class="text-sm text-gray-700">
            <span class="font-medium">Lining:</span> Blockout (2.5m) <span class="font-semibold">₹1,250</span>
          </div>
        </div>
      </div>

      <!-- Hardware Section -->
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center gap-2 mb-3">
          <FeatherIcon name="wrench" class="h-5 w-5 text-blue-600" />
          <h3 class="text-sm font-semibold text-gray-900">Hardware</h3>
        </div>
        <div class="space-y-2">
          <div class="text-sm text-gray-700">
            <span class="font-medium">Rod:</span> 3" Picasso (5ft) <span class="font-semibold">₹3,000</span>
          </div>
          <div class="text-sm text-gray-700">
            <span class="font-medium">Lead Rope:</span> 60 (1.5m) <span class="font-semibold">₹600</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FormControl, FeatherIcon } from 'frappe-ui'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const formData = ref({
  layer: '',
  trackType: '',
  opening: '',
  width: null,
  height: null,
  panels: null,
})

const layerOptions = [
  { label: 'Front', value: 'Front' },
  { label: 'Back', value: 'Back' },
  { label: 'Middle', value: 'Middle' },
]

const trackTypeOptions = [
  { label: 'Curtain Rod', value: 'Curtain Rod' },
  { label: 'Track', value: 'Track' },
  { label: 'Rail', value: 'Rail' },
]

const openingOptions = [
  { label: 'Center', value: 'Center' },
  { label: 'Left', value: 'Left' },
  { label: 'Right', value: 'Right' },
]

onMounted(() => {
  // Initialize form data - if product is new, keep empty values
  // Otherwise, use default values or product data
  if (!props.product.isNew) {
    // For existing products, you can load their saved data here
    // For now, using defaults
    formData.value = {
      layer: 'Front',
      trackType: 'Curtain Rod',
      opening: 'Center',
      width: 30.000,
      height: 40.000,
      panels: 1,
    }
  }
})
</script>

