<template>
  <LayoutHeader>
    <template #left-header>
      <ViewBreadcrumbs v-model="viewControls" routeName="Hardware" />
    </template>
    <template #right-header>
      <Button
        variant="solid"
        :label="__('Create')"
        iconLeft="plus"
        @click="() => {}"
      />
    </template>
  </LayoutHeader>
  <div class="flex h-full items-center justify-center">
    <div class="flex flex-col items-center gap-3 text-xl font-medium text-ink-gray-4">
      <FileIcon class="h-10 w-10" />
      <span>{{ __('Hardware') }}</span>
      <p class="text-sm text-ink-gray-5">{{ __('Content will be added here') }}</p>
    </div>
  </div>
</template>

<script setup>
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs.vue'
import FileIcon from '@/components/Icons/FileIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import { ref } from 'vue'

const viewControls = ref(null)
</script>

