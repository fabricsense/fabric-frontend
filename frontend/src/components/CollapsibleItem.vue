<template>
  <div class="border border-gray-200 rounded-lg bg-white">
    <!-- Header - Always visible -->
    <div
      class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
      @click="toggle"
    >
      <!-- Variant: category (with badge and product count) -->
      <template v-if="variant === 'category'">
        <!-- Left side: Collapse icon, custom icon, name, badge, and description -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <!-- Collapse/Expand triangle icon -->
          <FeatherIcon
            name="chevron-down"
            class="h-4 w-4 text-gray-600 flex-shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': !isOpen }"
          />
          
          <!-- Custom icon (if provided) -->
          <component
            v-if="icon"
            :is="icon"
            class="h-5 w-5 flex-shrink-0"
          />
          
          <!-- Name -->
          <span class="font-semibold text-gray-900 truncate">
            {{ name }}
          </span>
          
          <!-- Product count badge -->
          <span
            v-if="productCount !== null && productCount !== undefined"
            class="px-2 py-0.5 rounded-full bg-gray-200 text-gray-900 text-xs font-medium whitespace-nowrap"
          >
            {{ productCount }} {{ productCount === 1 ? 'Product' : 'Products' }}
          </span>
          
          <!-- Description text -->
          <span v-if="text" class="text-sm text-gray-600 truncate">
            {{ text }}
          </span>
        </div>

        <!-- Right side: Rate, Copy button, and Delete button -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <!-- Rate/Price -->
          <span v-if="rate" class="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {{ formatRate(rate) }}
          </span>
          
          <!-- Copy button -->
          <button
            v-if="showCopy"
            class="h-7 w-7 flex items-center justify-center border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition-colors flex-shrink-0"
            :title="__('Copy')"
            @click.stop="handleCopy"
          >
            <FeatherIcon name="copy" class="h-4 w-4 text-gray-700" />
          </button>
          
          <!-- Delete button -->
          <button
            v-if="showDelete"
            class="h-7 w-7 flex items-center justify-center border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition-colors flex-shrink-0"
            :title="__('Delete')"
            @click.stop="handleDelete"
          >
            <FeatherIcon name="trash-2" class="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </template>

      <!-- Variant: default (original layout) -->
      <template v-else>
        <!-- Left side: Collapse icon, custom icon, and name -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <!-- Collapse/Expand triangle icon -->
          <FeatherIcon
            name="chevron-right"
            class="h-4 w-4 text-gray-600 flex-shrink-0 transition-transform duration-200"
            :class="{ 'rotate-90': isOpen }"
          />
          
          <!-- Custom icon (if provided) -->
          <component
            v-if="icon"
            :is="icon"
            class="h-5 w-5 flex-shrink-0"
          />
          
          <!-- Name -->
          <span class="font-semibold text-gray-900 truncate">
            {{ name }}
          </span>
        </div>

        <!-- Right side: Text, Rate, and Close button -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <!-- Description text -->
          <span v-if="text" class="text-sm text-gray-600 whitespace-nowrap">
            {{ text }}
          </span>
          
          <!-- Rate/Price -->
          <span v-if="rate" class="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {{ formatRate(rate) }}
          </span>
          
          <!-- Close button -->
          <Button
            v-if="showClose"
            variant="ghost"
            size="sm"
            class="!h-7 !w-7 !p-0 flex-shrink-0"
            @click.stop="handleClose"
          >
            <FeatherIcon name="x" class="h-4 w-4" />
          </Button>
        </div>
      </template>
    </div>

    <!-- Collapsible content -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[1000px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[1000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <div class="px-4 py-3 border-t border-gray-100">
          <slot>
            <!-- Default empty content - can be filled later -->
            <div class="text-sm text-gray-500">
              {{ __('Content will be added here') }}
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FeatherIcon, Button } from 'frappe-ui'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, String],
    default: null,
  },
  text: {
    type: String,
    default: '',
  },
  rate: {
    type: [Number, String],
    default: null,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default', // 'default' or 'category'
    validator: (value) => ['default', 'category'].includes(value),
  },
  productCount: {
    type: [Number, String],
    default: null,
  },
  showCopy: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close', 'toggle', 'copy', 'delete'])

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

function handleClose() {
  emit('close')
}

function handleCopy() {
  emit('copy')
}

function handleDelete() {
  emit('delete')
}

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

