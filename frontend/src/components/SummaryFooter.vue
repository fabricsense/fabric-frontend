<template>
  <div class="bg-gray-200 text-gray-900 px-4 py-3 rounded-b-lg flex items-center justify-between gap-4">
    <!-- Left side: Total Products, Total Fabric, Total Lining -->
    <div class="flex items-center gap-6 flex-1">
      <!-- Total Products -->
      <div class="flex items-center gap-2">
        <DocumentIcon class="h-4 w-4 flex-shrink-0 text-gray-700" />
        <span class="text-sm whitespace-nowrap">
          {{ __('Total Products') }}: <span class="font-semibold">{{ totalProducts }}</span>
        </span>
      </div>

      <!-- Total Fabric -->
      <div class="flex items-center gap-2">
        <FileImageIcon class="h-4 w-4 flex-shrink-0 text-gray-700" />
        <span class="text-sm whitespace-nowrap">
          {{ __('Total Fabric') }}: <span class="font-semibold">{{ totalFabric }}</span>
        </span>
      </div>

      <!-- Total Lining -->
      <div class="flex items-center gap-2">
        <FileIcon class="h-4 w-4 flex-shrink-0 text-gray-700" />
        <span class="text-sm whitespace-nowrap">
          {{ __('Total Lining') }}: <span class="font-semibold">{{ totalLining }}</span>
        </span>
      </div>
    </div>

    <!-- Right side: Total Rate -->
    <div class="flex items-center gap-2 flex-shrink-0">
      <span class="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {{ categoryName }} {{ __('Total') }}: {{ formatRate(totalRate) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import DocumentIcon from '@/components/Icons/DocumentIcon.vue'
import FileImageIcon from '@/components/Icons/FileImageIcon.vue'
import FileIcon from '@/components/Icons/FileIcon.vue'

const props = defineProps({
  totalProducts: {
    type: [Number, String],
    default: 0,
  },
  totalFabric: {
    type: [Number, String],
    default: '0m',
  },
  totalLining: {
    type: [Number, String],
    default: '0m',
  },
  totalRate: {
    type: [Number, String],
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
})

function formatRate(rate) {
  if (typeof rate === 'number') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rate)
  }
  return rate
}
</script>

