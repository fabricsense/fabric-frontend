<template>
  <MeasurementSheetDetail
    :sheetId="sheetId"
    :data="sheetData"
  />
</template>

<script setup>
import MeasurementSheetDetail from '@/components/MeasurementSheetDetail.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { call } from 'frappe-ui'

const route = useRoute()
const sheetId = route.params.sheetId

const sheetData = ref({
  customer: '',
  measurementDate: '',
  serviceRequired: '',
  salesPerson: '',
  measurementMethod: '',
  status: 'Draft',
})

onMounted(async () => {
  // Get data from sessionStorage (passed from list page)
  const storedData = sessionStorage.getItem('measurementSheetData')
  if (storedData) {
    try {
      const rowData = JSON.parse(storedData)
      sheetData.value = {
        customer: rowData.customer || '',
        measurementDate: rowData.measurementDate || '',
        serviceRequired: rowData.serviceRequired || '',
        salesPerson: rowData.salesPerson || '',
        measurementMethod: rowData.measurementMethod || '',
        status: rowData.status || 'Draft',
      }
      // Clear the stored data after using it
      sessionStorage.removeItem('measurementSheetData')
    } catch (e) {
      console.error('Error parsing stored data:', e)
    }
  }
  
  // If no stored data, you can fetch from API
  // await call('crm.api.measurement_sheet.get', { name: sheetId })
})
</script>

