<template>
  <div class="bg-gray-50 rounded-lg p-4 space-y-4">
    <!-- Bottom Row: Two Rows -->
    <!-- First Row: Dimensions and Items & Lining -->
    <div class="grid grid-cols-3 gap-4 mb-4">
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

      <!-- Items and Lining Section (Combined) -->
      <div class="bg-white rounded-lg p-4 border border-gray-200 col-span-2">
        <div class="grid grid-cols-2 gap-6">
          <!-- Fabric Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Items</h3>
            <div class="space-y-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">
                  Fabric Selected <span class="text-red-500">*</span>
                </label>
                <FormControl
                  type="text"
                  v-model="formData.fabricSelected"
                  placeholder="Select Fabric"
                />
                <p class="mt-1 text-xs text-gray-500">Filtered by items under 'Window Furnishings' item group</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Fabric Quantity(Meters)</label>
                <FormControl
                  type="number"
                  v-model="formData.fabricQuantity"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Fabric Rate</label>
                <FormControl
                  type="number"
                  v-model="formData.fabricRate"
                  placeholder="₹ 0.00"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Fabric Amount</label>
                <FormControl
                  type="number"
                  v-model="formData.fabricAmount"
                  placeholder="₹ 0.00"
                  :readonly="true"
                />
              </div>
            </div>
          </div>

          <!-- Lining Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Lining</h3>
            <div class="space-y-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Lining</label>
                <FormControl
                  type="text"
                  v-model="formData.lining"
                  placeholder="Select Lining"
                />
                <p class="mt-1 text-xs text-gray-500">Filtered by items under 'Linings' item group</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Lining Quantity(Meters)</label>
                <FormControl
                  type="number"
                  v-model="formData.liningQuantity"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Lining Rate</label>
                <FormControl
                  type="number"
                  v-model="formData.liningRate"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">Lining Amount</label>
                <FormControl
                  type="number"
                  v-model="formData.liningAmount"
                  placeholder="₹ 0.00"
                  :readonly="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Row: Lead Rope and Hardware -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Lead Rope Section -->
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Lead Rope</h3>
        <div class="grid grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">Lead Rope</label>
              <FormControl
                type="text"
                v-model="formData.leadRope"
                placeholder="Select Lead Rope"
              />
              <p class="mt-1 text-xs text-gray-500">Filtered by items under 'Stitching Accessories' item group</p>
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">Lead Rope Quantity(meter)</label>
              <FormControl
                type="number"
                v-model="formData.leadRopeQuantity"
                placeholder="0"
              />
            </div>
          </div>
          <!-- Right Column -->
          <div class="space-y-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">Lead Rope Rate</label>
              <FormControl
                type="number"
                v-model="formData.leadRopeRate"
                placeholder="0.00"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">Lead Rope Amount</label>
              <FormControl
                type="number"
                v-model="formData.leadRopeAmount"
                placeholder="₹0.00"
                :readonly="true"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Hardware Section -->
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Hardware</h3>
        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">Track/Rod</label>
            <FormControl
              type="text"
              v-model="formData.trackRod"
              placeholder="Select Track/Rod"
            />
            <p class="mt-1 text-xs text-gray-500">Filtered by items under 'Tracks & Rods' item group</p>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">Track/Rod Type</label>
            <FormControl
              type="select"
              v-model="formData.trackRodType"
              :options="trackRodTypeOptions"
              placeholder="Select Type"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">Track/Rod Qty(Feet)</label>
            <FormControl
              type="number"
              v-model="formData.trackRodQty"
              placeholder="0"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">Track/Rod Rate</label>
            <FormControl
              type="number"
              v-model="formData.trackRodRate"
              placeholder="0.00"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">Track/Rod Amount</label>
            <FormControl
              type="number"
              v-model="formData.trackRodAmount"
              placeholder="₹ 0.00"
              :readonly="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
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
  fabricSelected: '',
  fabricQuantity: 0,
  fabricRate: 0.00,
  fabricAmount: 0.00,
  lining: '',
  liningQuantity: 0,
  liningRate: 0.00,
  liningAmount: 0.00,
  leadRope: '',
  leadRopeQuantity: 0,
  leadRopeRate: 0.00,
  leadRopeAmount: 0.00,
  trackRod: '',
  trackRodType: '',
  trackRodQty: 0,
  trackRodRate: 0.00,
  trackRodAmount: 0.00,
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

const trackRodTypeOptions = [
  { label: 'Single', value: 'Single' },
  { label: 'Double', value: 'Double' },
  { label: 'Triple', value: 'Triple' },
]

// Watch formData changes and sync back to product
watch(formData, (newFormData) => {
  // Calculate Fabric Amount
  if (newFormData.fabricQuantity && newFormData.fabricRate) {
    newFormData.fabricAmount = parseFloat((newFormData.fabricQuantity * newFormData.fabricRate).toFixed(2))
  } else {
    newFormData.fabricAmount = 0.00
  }
  
  // Calculate Lining Amount
  if (newFormData.liningQuantity && newFormData.liningRate) {
    newFormData.liningAmount = parseFloat((newFormData.liningQuantity * newFormData.liningRate).toFixed(2))
  } else {
    newFormData.liningAmount = 0.00
  }
  
  // Calculate Lead Rope Amount
  if (newFormData.leadRopeQuantity && newFormData.leadRopeRate) {
    newFormData.leadRopeAmount = parseFloat((newFormData.leadRopeQuantity * newFormData.leadRopeRate).toFixed(2))
  } else {
    newFormData.leadRopeAmount = 0.00
  }
  
  // Calculate Track/Rod Amount
  if (newFormData.trackRodQty && newFormData.trackRodRate) {
    newFormData.trackRodAmount = parseFloat((newFormData.trackRodQty * newFormData.trackRodRate).toFixed(2))
  } else {
    newFormData.trackRodAmount = 0.00
  }
  
  // Update the product object with form data
  props.product.formData = { ...newFormData }
  
  // Update the display text based on dimensions
  if (newFormData.width && newFormData.height) {
    const panelText = newFormData.panels ? ` • ${newFormData.panels} Panel${newFormData.panels > 1 ? 's' : ''}` : ''
    props.product.text = `${newFormData.width}" × ${newFormData.height}"${panelText}`
  }
}, { deep: true })

onMounted(() => {
  // Initialize form data from product.formData if it exists (for saved data)
  if (props.product.formData) {
    formData.value = {
      layer: props.product.formData.layer || '',
      trackType: props.product.formData.trackType || '',
      opening: props.product.formData.opening || '',
      width: props.product.formData.width || null,
      height: props.product.formData.height || null,
      panels: props.product.formData.panels || null,
      fabricSelected: props.product.formData.fabricSelected || '',
      fabricQuantity: props.product.formData.fabricQuantity || 0,
      fabricRate: props.product.formData.fabricRate || 0.00,
      fabricAmount: props.product.formData.fabricAmount || 0.00,
      lining: props.product.formData.lining || '',
      liningQuantity: props.product.formData.liningQuantity || 0,
      liningRate: props.product.formData.liningRate || 0.00,
      liningAmount: props.product.formData.liningAmount || 0.00,
      leadRope: props.product.formData.leadRope || '',
      leadRopeQuantity: props.product.formData.leadRopeQuantity || 0,
      leadRopeRate: props.product.formData.leadRopeRate || 0.00,
      leadRopeAmount: props.product.formData.leadRopeAmount || 0.00,
      trackRod: props.product.formData.trackRod || '',
      trackRodType: props.product.formData.trackRodType || '',
      trackRodQty: props.product.formData.trackRodQty || 0,
      trackRodRate: props.product.formData.trackRodRate || 0.00,
      trackRodAmount: props.product.formData.trackRodAmount || 0.00,
    }
  } else if (!props.product.isNew) {
    // For existing products with no saved formData, use defaults
    formData.value = {
      layer: 'Front',
      trackType: 'Curtain Rod',
      opening: 'Center',
      width: 30.000,
      height: 40.000,
      panels: 1,
      fabricSelected: '',
      fabricQuantity: 0,
      fabricRate: 0.00,
      fabricAmount: 0.00,
      lining: '',
      liningQuantity: 0,
      liningRate: 0.00,
      liningAmount: 0.00,
      leadRope: '',
      leadRopeQuantity: 0,
      leadRopeRate: 0.00,
      leadRopeAmount: 0.00,
      trackRod: '',
      trackRodType: '',
      trackRodQty: 0,
      trackRodRate: 0.00,
      trackRodAmount: 0.00,
    }
    // Sync these defaults to product
    props.product.formData = { ...formData.value }
  }
})
</script>

