<template>
  <Dialog v-model="show" :options="{ size: 'xl' }">
    <template #body>
      <div class="bg-surface-modal px-4 pb-6 pt-5 sm:px-6">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-semibold leading-6 text-ink-gray-9">
              {{ __('New Item') }}
            </h3>
          </div>
          <div class="flex items-center gap-1">
            <Button
              v-if="isManager() && !isMobileView"
              variant="ghost"
              class="w-7"
              :tooltip="__('Edit fields layout')"
              :icon="EditIcon"
              @click="openQuickEntryModal"
            />
            <Button
              variant="ghost"
              class="w-7"
              @click="show = false"
              icon="x"
            />
          </div>
        </div>
        <FieldLayout
          v-if="tabs.data?.length"
          :tabs="tabs.data"
          :data="_item.doc"
          doctype="Item"
        />
        <ErrorMessage class="mt-8" v-if="error" :message="__(error)" />
      </div>
      <div class="px-4 pb-7 pt-4 sm:px-6">
        <div class="space-y-2">
          <Button
            class="w-full"
            variant="solid"
            :label="__('Create')"
            :loading="loading"
            @click="createItem"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import FieldLayout from '@/components/FieldLayout/FieldLayout.vue'
import EditIcon from '@/components/Icons/EditIcon.vue'
import { usersStore } from '@/stores/users'
import { isMobileView } from '@/composables/settings'
import {
  showQuickEntryModal,
  quickEntryProps,
} from '@/composables/modals'
import { useDocument } from '@/data/document'
import { capture } from '@/telemetry'
import { call, createResource } from 'frappe-ui'
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  options: {
    type: Object,
    default: {
      redirect: true,
      afterInsert: () => {},
    },
  },
})

const { isManager } = usersStore()

const router = useRouter()
const show = defineModel()

const loading = ref(false)
const error = ref(null)

const { document: _item, triggerOnBeforeCreate } = useDocument('Item')

async function createItem() {
  loading.value = true
  error.value = null

  await triggerOnBeforeCreate?.()

  const doc = await call(
    'frappe.client.insert',
    {
      doc: {
        doctype: 'Item',
        ..._item.doc,
      },
    },
    {
      onError: (err) => {
        error.value = err.error?.messages?.[0]
        loading.value = false
      },
    },
  )
  if (doc.name) {
    capture('item_created')
    handleItemUpdate(doc)
  }
}

function handleItemUpdate(doc) {
  props.item?.reload?.()
  if (doc.name && props.options.redirect) {
    router.push({
      name: 'Item',
      params: { itemId: doc.name },
    })
  }
  show.value = false
  props.options.afterInsert && props.options.afterInsert(doc)
}

const tabs = createResource({
  url: 'crm.fcrm.doctype.crm_fields_layout.crm_fields_layout.get_fields_layout',
  cache: ['QuickEntry', 'Item'],
  params: { doctype: 'Item', type: 'Quick Entry' },
  auto: true,
  transform: (_tabs) => {
    // Fields to exclude from the form
    const excludedFields = [
      'disabled',
      'allow_alternative_item',
      'maintain_stock',
      'has_variants',
      'is_fixed_asset',
      'hsn_code',
    ]
    
    return _tabs.forEach((tab) => {
      tab.sections.forEach((section) => {
        section.columns.forEach((column) => {
          // Filter out excluded fields
          column.fields = column.fields.filter(
            (field) => !excludedFields.includes(field.fieldname?.toLowerCase())
          )
          
          column.fields.forEach((field) => {
            if (field.fieldtype === 'Table') {
              _item.doc[field.fieldname] = []
            }
          })
        })
      })
    })
  },
})

onMounted(() => {
  _item.doc = {}
  Object.assign(_item.doc, props.item.data || props.item)
})

function openQuickEntryModal() {
  showQuickEntryModal.value = true
  quickEntryProps.value = { doctype: 'Item' }
  nextTick(() => (show.value = false))
}
</script>

<style scoped>
:deep(:has(> .dropdown-button)) {
  width: 100%;
}
</style>

