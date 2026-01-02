<template>
  <LayoutHeader>
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <div class="flex items-center gap-2">
        <Button variant="ghost" iconLeft="mail" :label="__('Email')" />
        <Button variant="ghost" iconLeft="printer" :label="__('Print')" />
        <Button
          variant="solid"
          theme="green"
          iconLeft="save"
          :label="__('Save')"
          @click="handleSave"
        />
        <Button
          variant="solid"
          theme="blue"
          iconLeft="check"
          :label="__('Submit')"
          @click="handleSubmit"
        />
        <Dropdown :options="actionOptions">
          <Button variant="ghost" iconLeft="settings" :iconRight="'chevron-down'" :label="__('Actions')" />
        </Dropdown>
      </div>
    </template>
  </LayoutHeader>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Document Header -->
    <div class="px-5 py-4 border-b border-outline-gray-1">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-ink-gray-9">{{ sheetId }}</h1>
          <Badge
            v-if="status"
            :label="status"
            variant="subtle"
            theme="yellow"
            size="md"
          />
        </div>
      </div>
    </div>

    <!-- Key Information Section -->
    <div class="px-5 py-4 border-b border-outline-gray-1 bg-surface-gray-1">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <div class="text-xs font-medium text-ink-gray-5 mb-1">CUSTOMER</div>
          <div class="text-sm font-medium text-ink-gray-9">{{ data.customer || '-' }}</div>
        </div>
        <div>
          <div class="text-xs font-medium text-ink-gray-5 mb-1">MEASUREMENT DATE</div>
          <div class="text-sm font-medium text-ink-gray-9">{{ formatDate(data.measurementDate) || '-' }}</div>
        </div>
        <div>
          <div class="text-xs font-medium text-ink-gray-5 mb-1">SERVICE REQUIRED</div>
          <div class="text-sm font-medium text-ink-gray-9">{{ data.serviceRequired || '-' }}</div>
        </div>
        <div>
          <div class="text-xs font-medium text-ink-gray-5 mb-1">SALES PERSON</div>
          <div class="text-sm font-medium text-ink-gray-9">{{ data.salesPerson || '-' }}</div>
        </div>
        <div>
          <div class="text-xs font-medium text-ink-gray-5 mb-1">MEASUREMENT METHOD</div>
          <div class="text-sm font-medium text-ink-gray-9">{{ data.measurementMethod || '-' }}</div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <Tabs
      as="div"
      v-model="activeTab"
      :tabs="tabs"
      class="flex flex-1 overflow-hidden flex-col [&_[role='tab']]:px-0 [&_[role='tablist']]:px-5 [&_[role='tablist']]:gap-7.5 [&_[role='tabpanel']:not([hidden])]:flex [&_[role='tabpanel']:not([hidden])]:grow"
    >
      <template #tab-panel>
        <div class="flex-1 overflow-auto p-5">
          <!-- Measurements Tab Content -->
          <div class="space-y-4">
            <!-- Add Area Button -->
            <div class="mb-4">
              <Button
                variant="outline"
                iconLeft="plus"
                :label="__('Add Area')"
                @click="showAreaSelector = !showAreaSelector"
              />
              
              <!-- Area Selector Dropdown -->
              <div v-if="showAreaSelector" class="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48">
                <div
                  v-for="area in availableAreas"
                  :key="area.value"
                  class="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-700"
                  @click="handleAddArea(area)"
                >
                  {{ area.label }}
                </div>
              </div>
            </div>

            <!-- Area Containers -->
            <CategoryProductContainer
              v-for="(area, index) in areas"
              :key="area.id"
              :categoryName="area.name"
              :categoryIcon="area.icon"
              :categoryDescription="area.description"
              :productCount="area.products.length"
              :products="area.products"
              :productTypes="productTypes"
              :totalProducts="area.products.length"
              :totalFabric="area.totalFabric"
              :totalLining="area.totalLining"
              :totalRate="area.totalRate"
              :defaultOpen="area.isNew || false"
              @copy="() => handleCopyArea(index)"
              @delete="() => handleDeleteArea(index)"
              @addProduct="() => handleAddProduct(index)"
              @removeProduct="(productIndex) => handleRemoveProduct(index, productIndex)"
              @productTypeSelected="(productType) => handleProductTypeSelected(index, productType)"
            />
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import LayoutHeader from '@/components/LayoutHeader.vue'
import CategoryProductContainer from '@/components/CategoryProductContainer.vue'
import { Button, Badge, Dropdown, Tabs, Breadcrumbs, call, toast } from 'frappe-ui'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DocumentIcon from '@/components/Icons/DocumentIcon.vue'
import SparkleIcon from '@/components/Icons/SparkleIcon.vue'
import FileIcon from '@/components/Icons/FileIcon.vue'
import FileImageIcon from '@/components/Icons/FileImageIcon.vue'

// Using FileImageIcon as placeholder for WindowIcon
const WindowIcon = FileImageIcon

const props = defineProps({
  sheetId: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const route = useRoute()
const router = useRouter()

const status = ref(props.data.status || 'Draft')
const activeTab = ref(0)
const showAreaSelector = ref(false)

// Helper function to get icon component from name
const getIconComponent = (iconName) => {
  const iconMap = {
    'document': DocumentIcon,
    'sparkle': SparkleIcon,
    'file': FileIcon,
    'window': FileImageIcon,
  }
  return iconMap[iconName] || FileIcon
}

// Available areas to add
const availableAreas = [
  { label: 'Bed room', value: 'bed-room', icon: FileImageIcon, description: 'Window Curtains, Sheer Curtains, Blinds' },
  { label: 'Master bedroom', value: 'master-bedroom', icon: FileImageIcon, description: 'Window Curtains, Sheer Curtains, Blinds' },
  { label: 'Guest Room', value: 'guest-room', icon: FileImageIcon, description: 'Window Curtains, Sheer Curtains, Blinds' },
  { label: 'Kids Room', value: 'kids-room', icon: FileImageIcon, description: 'Window Curtains, Sheer Curtains, Blinds' },
  { label: 'Living Room', value: 'living-room', icon: FileImageIcon, description: 'Window Curtains, Sheer Curtains, Blinds' },
]

// Areas data structure - initialized as empty, will be populated from sessionStorage or defaults
const areas = ref([])

// Load saved data from sessionStorage on mount
onMounted(() => {
  const savedSheets = JSON.parse(sessionStorage.getItem('savedMeasurementSheets') || '{}')
  const savedData = savedSheets[props.sheetId]
  
  if (savedData && savedData.areas && savedData.areas.length > 0) {
    // Restore areas from saved data, converting iconName back to icon components
    areas.value = savedData.areas.map(area => ({
      id: area.id,
      name: area.name,
      icon: getIconComponent(area.iconName),
      description: area.description,
      products: area.products.map(product => ({
        id: product.id,
        name: product.name,
        icon: getIconComponent(product.iconName),
        text: product.text,
        rate: product.rate,
        isNew: product.isNew,
        formData: product.formData || null,
      })),
      totalFabric: area.totalFabric,
      totalLining: area.totalLining,
      totalRate: area.totalRate,
      isNew: area.isNew,
    }))
    
    // Also restore status if saved
    if (savedData.status) {
      status.value = savedData.status
    }
    
    console.log('Loaded areas from sessionStorage:', areas.value)
  } else {
    // No saved data - start with empty areas
    areas.value = []
    console.log('No saved data found, starting with empty areas')
  }
})

// Available product types for selection
const productTypes = ref([
  {
    name: 'Window Curtains',
    icon: DocumentIcon,
  },
  {
    name: 'Roman Blinds',
    icon: FileIcon,
  },
  {
    name: 'Blinds',
    icon: FileIcon,
  },
  {
    name: 'Tracks/Rods',
    icon: FileIcon,
  },
])

const breadcrumbs = computed(() => [
  {
    label: __('Home'),
    route: { name: 'Dashboard' },
  },
  {
    label: __('Measurement Sheet'),
    route: { name: 'Measurement Sheet' },
  },
  {
    label: props.sheetId,
  },
])

const tabs = computed(() => [
  {
    label: __('Measurements'),
    value: 'measurements',
    icon: 'ruler',
  },
])

const actionOptions = computed(() => [
  {
    label: __('Edit'),
    icon: 'edit',
    onClick: () => console.log('Edit'),
  },
  {
    label: __('Delete'),
    icon: 'trash-2',
    onClick: () => console.log('Delete'),
  },
])

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  } catch (e) {
    return dateString
  }
}

async function handleSave() {
  try {
    // Helper function to get icon name from component
    const getIconName = (iconComponent) => {
      if (!iconComponent) return 'file'
      if (iconComponent === DocumentIcon) return 'document'
      if (iconComponent === SparkleIcon) return 'sparkle'
      if (iconComponent === FileIcon) return 'file'
      if (iconComponent === FileImageIcon || iconComponent === WindowIcon) return 'window'
      return 'file'
    }

    // Serialize areas data - convert icon components to string names
    const serializableAreas = areas.value.map(area => ({
      id: area.id,
      name: area.name,
      iconName: getIconName(area.icon),
      description: area.description,
      products: area.products.map(product => ({
        id: product.id,
        name: product.name,
        iconName: getIconName(product.icon),
        text: product.text,
        rate: product.rate,
        isNew: product.isNew,
        formData: product.formData || null,
      })),
      totalFabric: area.totalFabric,
      totalLining: area.totalLining,
      totalRate: area.totalRate,
      isNew: area.isNew,
    }))

    // Prepare the measurement sheet data for saving
    const measurementData = {
      customer: props.data.customer,
      measurementDate: props.data.measurementDate,
      serviceRequired: props.data.serviceRequired,
      salesPerson: props.data.salesPerson,
      measurementMethod: props.data.measurementMethod,
      status: status.value,
      areas: serializableAreas,
    }

    console.log('Saving Measurement Sheet:', props.sheetId)
    console.log('Measurement Data:', measurementData)

    // Save to sessionStorage for persistence across page refreshes
    const savedSheets = JSON.parse(sessionStorage.getItem('savedMeasurementSheets') || '{}')
    savedSheets[props.sheetId] = measurementData
    sessionStorage.setItem('savedMeasurementSheets', JSON.stringify(savedSheets))
    
    console.log('Saved to sessionStorage successfully:', props.sheetId)

    // Try to save to backend if CRM Lead exists with this ID
    try {
      // Check if a CRM Lead with matching name exists
      const existingLead = await call('frappe.client.get_value', {
        doctype: 'CRM Lead',
        filters: { name: props.sheetId },
        fieldname: ['name', 'first_name'],
      })

      if (existingLead && existingLead.name) {
        // Update existing CRM Lead with available fields
        await call('frappe.client.set_value', {
          doctype: 'CRM Lead',
          name: existingLead.name,
          fieldname: 'status',
          value: status.value === 'Draft' ? 'New' : status.value,
        })
        console.log('Updated CRM Lead:', existingLead.name)
      }
    } catch (apiError) {
      // Backend save failed, but sessionStorage save succeeded
      console.log('Backend save skipped (no matching CRM Lead):', apiError.message || apiError)
    }

    toast.success(__('Measurement Sheet saved successfully'))
    status.value = props.data.status || 'Draft'
  } catch (error) {
    console.error('Error saving measurement sheet:', error)
    const errorMessage = error?.messages?.[0] || error?.message || error?.error?.message || __('Failed to save measurement sheet')
    toast.error(errorMessage)
  }
}

function handleSubmit() {
  console.log('Submit clicked')
  // Handle submit logic
}

function handleAddArea(area) {
  // Check if area already exists
  const areaExists = areas.value.some(a => a.name === area.label)
  if (areaExists) {
    // Area already exists, don't add duplicate
    showAreaSelector.value = false
    return
  }

  // Create a new area with empty products
  const newArea = {
    id: Date.now(),
    name: area.label,
    icon: area.icon,
    description: area.description,
    products: [],
    totalFabric: '0m',
    totalLining: '0m',
    totalRate: 0,
    isNew: true,
  }

  // Add the new area
  areas.value.push(newArea)
  showAreaSelector.value = false
}

function handleCopyArea(areaIndex) {
  console.log('Copy area at index:', areaIndex)
  // Handle copy area action
}

function handleDeleteArea(areaIndex) {
  console.log('Delete area at index:', areaIndex)
  areas.value.splice(areaIndex, 1)
  // Handle delete area action
}

function handleAddProduct(areaIndex) {
  console.log('Add product to area at index:', areaIndex)
  // Handle add product action
}

function handleRemoveProduct(areaIndex, productIndex) {
  console.log('Remove product at area index:', areaIndex, 'product index:', productIndex)
  areas.value[areaIndex].products.splice(productIndex, 1)
  // Update area totals if needed
}

function handleProductTypeSelected(areaIndex, productType) {
  // Create a new product with empty/default values
  const newProduct = {
    name: productType.name,
    icon: productType.icon,
    text: '', // Empty initially, user will fill in dimensions
    rate: 0, // Empty initially, will be calculated from form data
    id: Date.now(), // Unique ID for the product
    isNew: true, // Flag to indicate this is a new product
  }
  
  // Add the new product to the specific area's products array
  areas.value[areaIndex].products.push(newProduct)
}
</script>

