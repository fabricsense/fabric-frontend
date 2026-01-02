<template>
  <LayoutHeader>
    <template #left-header>
      <ViewBreadcrumbs v-model="viewControls" routeName="Measurement Sheet" />
    </template>
    <template #right-header>
      <Button
        variant="solid"
        :label="__('Create Measurement Sheet')"
        iconLeft="plus"
        @click="showLeadModal = true"
      />
    </template>
  </LayoutHeader>
  <div class="p-6">
    <MeasurementSheetTable
      :data="measurementSheetData"
      :totalCount="5"
      @rowClick="handleRowClick"
    />
  </div>
  <LeadModalNew
    v-if="showLeadModal"
    v-model="showLeadModal"
    @created="handleNewRecordCreated"
  />
</template>

<script setup>
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import MeasurementSheetTable from '@/components/MeasurementSheetTable.vue'
import LeadModalNew from '@/components/Modals/LeadModalNew.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const viewControls = ref(null)
const showLeadModal = ref(false)

// Sample measurement sheet data - only 5 rows
const measurementSheetData = ref([
  {
    id: 'MS-2026-0001',
    customer: 'Dwani',
    measurementDate: '2026-01-01',
    measurementDateFull: '2026-01-01',
    measurementMethod: 'Customer Provided',
    serviceRequired: 'Delivery',
    salesPerson: 'Administrator',
    status: 'Draft',
    createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'MS-2025-0118',
    customer: 'Dwani',
    measurementDate: '2025-12-31',
    measurementDateFull: '2025-12-31',
    measurementMethod: 'Customer Provided',
    serviceRequired: 'Delivery',
    salesPerson: 'Administrator',
    status: 'Draft',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'MS-2025-0117',
    customer: 'panchami',
    measurementDate: '2025-12-30',
    measurementDateFull: '2025-12-30',
    measurementMethod: 'Customer Provided',
    serviceRequired: 'Fitting',
    salesPerson: 'Administrator',
    status: 'Draft',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'MS-2025-0116',
    customer: 'Dwani',
    measurementDate: '2025-12-30',
    measurementDateFull: '2025-12-30',
    measurementMethod: 'Customer Provided',
    serviceRequired: 'Delivery',
    salesPerson: 'Administrator',
    status: 'Draft',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'MS-2025-0115',
    customer: 'Dwani',
    measurementDate: '2025-12-30',
    measurementDateFull: '2025-12-30',
    measurementMethod: 'Customer Provided',
    serviceRequired: 'Delivery',
    salesPerson: 'Administrator',
    status: 'Draft',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
])

function handleRowClick(row) {
  // Store the row data in sessionStorage to pass to detail page
  sessionStorage.setItem('measurementSheetData', JSON.stringify(row))
  router.push({ name: 'Measurement Sheet Detail', params: { sheetId: row.id } })
}

function handleNewRecordCreated(newRecord) {
  // Add the new record to the array
  measurementSheetData.value.push(newRecord)
  // Sort all records by createdAt in descending order (newest first)
  measurementSheetData.value.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return dateB - dateA
  })
  // Keep only the first 5 records
  measurementSheetData.value = measurementSheetData.value.slice(0, 5)
}

onMounted(() => {
  // Load records from session storage
  const storedRecords = JSON.parse(sessionStorage.getItem('measurementSheets') || '[]')
  if (storedRecords.length > 0) {
    // Merge with existing data, avoiding duplicates
    const existingIds = new Set(measurementSheetData.value.map(r => r.id))
    const newRecords = storedRecords.filter(r => !existingIds.has(r.id))
    measurementSheetData.value = [...newRecords, ...measurementSheetData.value]
  }
  // Sort all records by createdAt in descending order (newest first)
  measurementSheetData.value.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return dateB - dateA
  })
  // Keep only the first 5 records
  measurementSheetData.value = measurementSheetData.value.slice(0, 5)
})
</script>

