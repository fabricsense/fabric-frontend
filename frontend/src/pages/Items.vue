<template>
  <LayoutHeader>
    <template #left-header>
      <ViewBreadcrumbs v-model="viewControls" routeName="Items" />
    </template>
    <template #right-header>
      <CustomActions
        v-if="itemsListView?.customListActions"
        :actions="itemsListView.customListActions"
      />
      <Button
        variant="solid"
        :label="__('Create')"
        iconLeft="plus"
        @click="showItemModal = true"
      />
    </template>
  </LayoutHeader>
  <ViewControls
    ref="viewControls"
    v-model="items"
    v-model:loadMore="loadMore"
    v-model:resizeColumn="triggerResize"
    v-model:updatedPageCount="updatedPageCount"
    doctype="Item"
  />
  <ItemsListView
    ref="itemsListView"
    v-if="items.data && rows.length"
    v-model="items.data.page_length_count"
    v-model:list="items"
    :rows="rows"
    :columns="items.data.columns"
    :options="{
      showTooltip: false,
      resizeColumn: true,
      rowCount: items.data.row_count,
      totalCount: items.data.total_count,
    }"
    @loadMore="() => loadMore++"
    @columnWidthUpdated="() => triggerResize++"
    @updatePageCount="(count) => (updatedPageCount = count)"
    @applyFilter="(data) => viewControls.applyFilter(data)"
    @applyLikeFilter="(data) => viewControls.applyLikeFilter(data)"
    @likeDoc="(data) => viewControls.likeDoc(data)"
    @selectionsChanged="
      (selections) => viewControls.updateSelections(selections)
    "
  />
  <div
    v-else-if="items.data"
    class="flex h-full items-center justify-center"
  >
    <div
      class="flex flex-col items-center gap-3 text-xl font-medium text-ink-gray-4"
    >
      <DocumentIcon class="h-10 w-10" />
      <span>{{ __('No {0} Found', [__('Items')]) }}</span>
      <Button
        :label="__('Create')"
        iconLeft="plus"
        @click="showItemModal = true"
      />
    </div>
  </div>
  <ItemModal
    v-if="showItemModal"
    v-model="showItemModal"
    :item="{}"
  />
</template>

<script setup>
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs.vue'
import CustomActions from '@/components/CustomActions.vue'
import DocumentIcon from '@/components/Icons/DocumentIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import ItemModal from '@/components/Modals/ItemModal.vue'
import ItemsListView from '@/components/ListViews/ItemsListView.vue'
import ViewControls from '@/components/ViewControls.vue'
import { getMeta } from '@/stores/meta'
import { formatDate, timeAgo } from '@/utils'
import { ref, computed } from 'vue'

const { getFormattedPercent, getFormattedFloat, getFormattedCurrency } =
  getMeta('Item')

const showItemModal = ref(false)

const itemsListView = ref(null)

// items data is loaded in the ViewControls component
const items = ref({})
const loadMore = ref(1)
const triggerResize = ref(1)
const updatedPageCount = ref(20)
const viewControls = ref(null)

const rows = computed(() => {
  if (
    !items.value?.data?.data ||
    !['list', 'group_by'].includes(items.value.data.view_type)
  )
    return []
  return items.value?.data.data.map((item) => {
    let _rows = {}
    items.value?.data.rows.forEach((row) => {
      _rows[row] = item[row]

      let fieldType = items.value?.data.columns?.find(
        (col) => (col.key || col.value) == row,
      )?.type

      if (
        fieldType &&
        ['Date', 'Datetime'].includes(fieldType) &&
        !['modified', 'creation'].includes(row)
      ) {
        _rows[row] = formatDate(item[row], '', true, fieldType == 'Datetime')
      }

      if (fieldType && fieldType == 'Currency') {
        _rows[row] = getFormattedCurrency(row, item)
      }

      if (fieldType && fieldType == 'Float') {
        _rows[row] = getFormattedFloat(row, item)
      }

      if (fieldType && fieldType == 'Percent') {
        _rows[row] = getFormattedPercent(row, item)
      }

      if (row == 'full_name') {
        _rows[row] = {
          label: item.full_name,
          image_label: item.full_name,
          image: item.image,
        }
      } else if (row == 'company_name') {
        _rows[row] = {
          label: item.company_name,
          logo: null, // You can add organization logic here if needed
        }
      } else if (['modified', 'creation'].includes(row)) {
        _rows[row] = {
          label: formatDate(item[row]),
          timeAgo: __(timeAgo(item[row])),
        }
      }
    })
    return _rows
  })
})
</script>

