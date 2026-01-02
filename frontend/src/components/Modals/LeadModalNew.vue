<template>
  <Dialog v-model="show" :options="{ size: '3xl' }">
    <template #body>
      <div class="bg-surface-modal px-4 pb-6 pt-5 sm:px-6">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-semibold leading-6 text-ink-gray-9">
              {{ __('Create Lead') }}
            </h3>
          </div>
          <div class="flex items-center gap-1">
            <Button
              variant="ghost"
              class="w-7"
              @click="show = false"
              icon="x"
            />
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-4">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Series -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Series') }}
                </label>
                <FormControl
                  type="select"
                  v-model="lead.doc.series"
                  :options="seriesOptions"
                  placeholder="MS-.YYYY.-.####"
                />
              </div>
              
              <!-- Customer -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Customer') }}
                </label>
                <FormControl
                  type="text"
                  v-model="lead.doc.customer"
                  :placeholder="__('Customer')"
                />
              </div>
              
              <!-- Services Required -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Services Required') }}
                </label>
                <FormControl
                  type="select"
                  v-model="lead.doc.services_required"
                  :options="servicesOptions"
                  :placeholder="__('Services Required')"
                />
              </div>
              
              <!-- Project -->
              <div v-if="lead.doc.services_required === 'Fitting'">
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Project') }}
                </label>
                <Link
                  :value="lead.doc.project"
                  doctype="Project"
                  :placeholder="__('Project')"
                  @change="(value) => (lead.doc.project = value)"
                />
              </div>
            </div>
            
            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Status -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Status') }}
                </label>
                <FormControl
                  type="select"
                  v-model="lead.doc.status"
                  :options="leadStatuses"
                  :placeholder="__('Status')"
                />
              </div>
              
              <!-- Measurement Date -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Measurement Date') }}
                </label>
                <DatePicker
                  :value="lead.doc.measurement_date"
                  :formatter="(date) => formatDate(date, '', true)"
                  :placeholder="__('Measurement Date')"
                  input-class="border-none"
                  @change="(v) => (lead.doc.measurement_date = v)"
                />
              </div>
              
              <!-- Measurement Method -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Measurement Method') }}
                </label>
                <FormControl
                  type="select"
                  v-model="lead.doc.measurement_method"
                  :options="measurementMethodOptions"
                  :placeholder="__('Measurement Method')"
                />
              </div>
              
              <!-- Sales Person -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Sales Person') }}
                </label>
                <Link
                  :value="lead.doc.sales_person && getUser(lead.doc.sales_person).full_name"
                  doctype="User"
                  :placeholder="__('Sales Person')"
                  @change="(value) => (lead.doc.sales_person = value)"
                />
              </div>
            </div>
          </div>
          <ErrorMessage class="mt-4" v-if="error" :message="__(error)" />
        </div>
      </div>
      <div class="px-4 pb-7 pt-4 sm:px-6">
        <div class="flex flex-row-reverse gap-2">
          <Button
            variant="solid"
            :label="__('Create')"
            @click="createNewLead"
          />
        </div>
      </div>
    </template>
  </Dialog>
  <LeadModal
    v-if="showFullForm"
    v-model="showFullForm"
    :defaults="lead.doc"
  />
</template>

<script setup>
import Link from '@/components/Controls/Link.vue'
import LeadModal from '@/components/Modals/LeadModal.vue'
import { usersStore } from '@/stores/users'
import { statusesStore } from '@/stores/statuses'
import { sessionStore } from '@/stores/session'
import { capture } from '@/telemetry'
import { FormControl, DatePicker, ErrorMessage, Dialog, createResource } from 'frappe-ui'
import { useOnboarding } from 'frappe-ui/frappe'
import { useDocument } from '@/data/document'
import { formatDate } from '@/utils'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  defaults: Object,
})

const { user } = sessionStore()
const { getUser } = usersStore()
const { statusOptions } = statusesStore()
const { updateOnboardingStep } = useOnboarding('frappecrm')

const show = defineModel()
const router = useRouter()
const error = ref(null)
const isLeadCreating = ref(false)
const showFullForm = ref(false)

const emit = defineEmits(['created'])

const { document: lead, triggerOnBeforeCreate } = useDocument('CRM Lead')

// Ensure lead.doc is initialized
if (!lead.doc) {
  lead.doc = {}
}

const leadStatuses = computed(() => {
  // Return specific status options as shown in the image
  return [
    { label: 'Draft', value: 'Draft' },
    { label: 'Customer Approval Pending', value: 'Customer Approval Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
  ]
})

const seriesOptions = [
  { label: 'MS-.YYYY.-.####', value: 'MS-.YYYY.-.####' },
]

const servicesOptions = [
  { label: __('Delivery'), value: 'Delivery' },
  { label: __('Fitting'), value: 'Fitting' },
]

const measurementMethodOptions = [
  { label: __('Customer Provided'), value: 'Customer Provided' },
  { label: __('Contractor Assigned'), value: 'Contractor Assigned' },
]

const createLead = createResource({
  url: 'frappe.client.insert',
})

function createNewLead() {
  // Generate a new ID based on series
  const today = new Date()
  const year = today.getFullYear()
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const newId = `MS-${year}-${randomNum}`
  
  // Get sales person full name
  const salesPersonName = lead.doc.sales_person && getUser(lead.doc.sales_person)?.full_name || lead.doc.sales_person || 'Administrator'
  
  // Create new measurement sheet record
  const newRecord = {
    id: newId,
    customer: lead.doc.customer || '',
    measurementDate: lead.doc.measurement_date || new Date().toISOString().split('T')[0],
    measurementDateFull: lead.doc.measurement_date || new Date().toISOString().split('T')[0],
    measurementMethod: lead.doc.measurement_method || '',
    serviceRequired: lead.doc.services_required || '',
    salesPerson: salesPersonName,
    status: lead.doc.status || 'Draft',
    createdAt: new Date().toISOString(),
  }
  
  // Save to session storage
  const existingData = JSON.parse(sessionStorage.getItem('measurementSheets') || '[]')
  existingData.push(newRecord)
  sessionStorage.setItem('measurementSheets', JSON.stringify(existingData))
  
  // Store the row data in sessionStorage to pass to detail page
  sessionStorage.setItem('measurementSheetData', JSON.stringify(newRecord))
  
  // Emit the new record to parent component
  emit('created', newRecord)
  
  // Close the modal
  show.value = false
  
  // Navigate to the detail page
  router.push({ name: 'Measurement Sheet Detail', params: { sheetId: newId } })
}

function openFullForm() {
  showFullForm.value = true
        show.value = false
}

onMounted(() => {
  lead.doc = {}
  Object.assign(lead.doc, props.defaults)

  // Set current date for measurement_date
  if (!lead.doc.measurement_date) {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    lead.doc.measurement_date = `${year}-${month}-${day}`
  }

  // Set sales person to signed in user
  if (!lead.doc.sales_person) {
    lead.doc.sales_person = user
  }

  // Set default series
  if (!lead.doc?.series) {
    lead.doc.series = 'MS-.YYYY.-.####'
  }

  // Set default status to "Draft"
  if (!lead.doc?.status) {
    lead.doc.status = 'Draft'
  }
})
</script>

