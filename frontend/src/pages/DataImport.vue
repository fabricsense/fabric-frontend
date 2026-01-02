<template>
  <DataImport
    :doctype="route.params.doctype"
    :importName="route.params.importName"
    :doctypeMap="doctypeMap"
  />
</template>

<script setup>
import { usePageMeta } from 'frappe-ui'
import { DataImport } from 'frappe-ui/frappe'
import { useRoute } from 'vue-router'

const route = useRoute()

const doctypeMap = {
  'CRM Lead': {
    title: 'Leads',
    listRoute: '/portal/leads',
    pageRoute: `/portal/leads/docname`,
  },
  'CRM Deal': {
    title: 'Deals',
    listRoute: '/portal/deals',
    pageRoute: `/portal/deals/docname`,
  },
  Contact: {
    title: 'Contacts',
    listRoute: '/portal/contacts',
    pageRoute: `/portal/contacts/docname`,
  },
  'CRM Task': {
    title: 'Tasks',
    listRoute: '/portal/tasks',
  },
  'CRM Organization': {
    title: 'Organizations',
    listRoute: '/portal/organizations',
    pageRoute: `/portal/organizations/docname`,
  },
  'CRM Call Log': {
    title: 'Call Log',
    listRoute: '/portal/call-logs',
  },
}

usePageMeta(() => {
  return {
    title: __('Data Import'),
  }
})
</script>
