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
                  <span class="text-ink-red-2">*</span>
                </label>
                <FormControl
                  type="select"
                  v-model="lead.doc.series"
                  :options="seriesOptions"
                  :placeholder="__('Series')"
                />
              </div>
              
              <!-- Customer -->
              <div>
                <label class="mb-2 block text-sm text-ink-gray-5">
                  {{ __('Customer') }}
                  <span class="text-ink-red-2">*</span>
                </label>
                <Link
                  :value="lead.doc.customer"
                  doctype="Customer"
                  :placeholder="__('Customer')"
                  @change="(value) => (lead.doc.customer = value)"
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
                  <span class="text-ink-red-2">*</span>
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
                  <span class="text-ink-red-2">*</span>
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
                  :value="lead.doc.sales_person"
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
            :loading="isLeadCreating"
            @click="createNewLead"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Link from '@/components/Controls/Link.vue'
import { usersStore } from '@/stores/users'
import { statusesStore } from '@/stores/statuses'
import { sessionStore } from '@/stores/session'
import { capture } from '@/telemetry'
import { FormControl, DatePicker, ErrorMessage, Dialog, Button, createResource } from 'frappe-ui'
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

const { document: lead, triggerOnBeforeCreate } = useDocument('CRM Lead')

const leadStatuses = computed(() => {
  let statuses = statusOptions('lead')
  if (!lead.doc.status) {
    lead.doc.status = statuses?.[0]?.value
  }
  return statuses
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

async function createNewLead() {
  await triggerOnBeforeCreate?.()

  createLead.submit(
    {
      doc: {
        doctype: 'CRM Lead',
        ...lead.doc,
      },
    },
    {
      validate() {
        error.value = null
        if (!lead.doc.series) {
          error.value = __('Series is mandatory')
          return error.value
        }
        if (!lead.doc.customer) {
          error.value = __('Customer is mandatory')
          return error.value
        }
        if (!lead.doc.measurement_date) {
          error.value = __('Measurement Date is mandatory')
          return error.value
        }
        if (!lead.doc.measurement_method) {
          error.value = __('Measurement Method is mandatory')
          return error.value
        }
        isLeadCreating.value = true
      },
      onSuccess(data) {
        capture('lead_created')
        isLeadCreating.value = false
        show.value = false
        router.push({ name: 'Lead', params: { leadId: data.name } })
        updateOnboardingStep('create_first_lead', true, false, () => {
          localStorage.setItem('firstLead' + user, data.name)
        })
      },
      onError(err) {
        isLeadCreating.value = false
        if (!err.messages) {
          error.value = err.message
          return
        }
        error.value = err.messages.join('\n')
      },
    },
  )
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

  if (!lead.doc?.status && leadStatuses.value[0]?.value) {
    lead.doc.status = leadStatuses.value[0].value
  }
})
</script>

