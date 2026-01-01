<template>
  <div class="border-t border-dashed border-gray-300 pt-3 mt-3">
    <button
      class="w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
      @click="handleClick"
    >
      <FeatherIcon name="plus" class="h-4 w-4" />
      <span>{{ __('Add Another Product to {0}', [categoryName]) }}</span>
    </button>
  </div>
</template>

<script setup>
import { FeatherIcon } from 'frappe-ui'

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

