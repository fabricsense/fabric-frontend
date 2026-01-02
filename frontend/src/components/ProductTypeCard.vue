<template>
  <button
    class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
    @click="handleClick"
  >
    <!-- Icon -->
    <component
      v-if="icon"
      :is="icon"
      class="h-8 w-8 flex-shrink-0"
    />
    
    <!-- Product Name -->
    <span class="text-sm font-medium text-gray-900 text-center">
      {{ name }}
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, String],
    default: null,
  },
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

