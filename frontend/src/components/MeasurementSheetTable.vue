<template>
  <div class="w-full">
    <div class="border-b border-outline-gray-1">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="text-sm font-medium text-ink-gray-7">
          {{ `${data.length} of ${totalCount || data.length}` }}
        </div>
      </div>
    </div>
    <div class="overflow-x-auto border border-outline-gray-1 rounded-lg bg-white">
      <table class="w-full table-auto">
        <thead>
          <tr class="border-b border-outline-gray-1 bg-surface-gray-1">
            <th class="px-4 py-3 text-left text-xs font-medium text-ink-gray-5">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-outline-gray-2"
                :checked="allSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-xs font-medium text-ink-gray-5"
            >
              {{ column.label }}
            </th>
            <th class="px-4 py-3 text-right text-xs font-medium text-ink-gray-5 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(row, index) in data"
            :key="row.id || index"
            class="border-b border-outline-gray-1 hover:bg-surface-gray-1 cursor-pointer transition-colors"
            @click="() => handleRowClick(row)"
          >
            <td class="px-4 py-3">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-outline-gray-2"
                :checked="selectedRows.includes(row.id || index)"
                @click.stop
                @change="() => toggleSelect(row.id || index)"
              />
            </td>
            <td class="px-4 py-3 text-sm text-ink-gray-9 whitespace-nowrap">
              {{ row.id }}
            </td>
            <td class="px-4 py-3 text-sm text-ink-gray-9 whitespace-nowrap">
              {{ row.customer }}
            </td>
            <td class="px-4 py-3 text-sm text-ink-gray-9 whitespace-nowrap">
              <Tooltip :text="`Measurement Date: ${row.measurementDateFull || row.measurementDate}`">
                <div>{{ formatDate(row.measurementDate) }}</div>
              </Tooltip>
            </td>
            <td class="px-4 py-3 text-sm text-ink-gray-9 whitespace-nowrap">
              {{ row.measurementMethod }}
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center justify-end gap-3">
                <span class="text-xs text-ink-gray-5 whitespace-nowrap">{{ getTimeAgo(row.createdAt || row.modifiedAt) }}</span>
                <div class="flex items-center gap-1">
                  <Button variant="ghost" class="h-6 min-w-6 p-0 flex items-center justify-center">
                    <FeatherIcon name="message-circle" class="h-4 w-4 text-ink-gray-5" />
                    <span class="ml-0.5 text-xs text-ink-gray-5">0</span>
                  </Button>
                  <Button variant="ghost" class="h-6 min-w-6 p-0 flex items-center justify-center">
                    <FeatherIcon name="heart" class="h-4 w-4 text-ink-gray-5" />
                    <span class="ml-0.5 text-xs text-ink-gray-5">0</span>
                  </Button>
                  <Button variant="ghost" class="h-6 w-6 p-0">
                    <FeatherIcon name="more-vertical" class="h-4 w-4 text-ink-gray-5" />
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button, Tooltip, FeatherIcon } from 'frappe-ui'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [
      { key: 'id', label: 'ID' },
      { key: 'customer', label: 'Customer' },
      { key: 'measurementDate', label: 'Measurement Date' },
      { key: 'measurementMethod', label: 'Measurement Method' },
    ],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  onRowClick: {
    type: Function,
    default: null,
  },
})

const emit = defineEmits(['rowClick', 'selectionChange'])

const selectedRows = ref([])

const allSelected = computed(() => {
  return props.data.length > 0 && selectedRows.value.length === props.data.length
})

function toggleSelectAll() {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = props.data.map((row, index) => row.id || index)
  }
  emit('selectionChange', selectedRows.value)
}

function toggleSelect(rowId) {
  const index = selectedRows.value.indexOf(rowId)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(rowId)
  }
  emit('selectionChange', selectedRows.value)
}

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

function getTimeAgo(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 24) {
      return `${diffHours} h`
    } else if (diffDays < 7) {
      return `${diffDays} d`
    } else {
      const diffWeeks = Math.floor(diffDays / 7)
      return `${diffWeeks} w`
    }
  } catch (e) {
    return ''
  }
}

function handleRowClick(row) {
  if (props.onRowClick) {
    props.onRowClick(row)
  } else {
    emit('rowClick', row)
  }
}
</script>

