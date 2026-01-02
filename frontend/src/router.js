import { createRouter, createWebHistory } from 'vue-router'
import { usersStore } from '@/stores/users'
import { sessionStore } from '@/stores/session'
import { viewsStore } from '@/stores/views'

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/pages/MobileNotification.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    alias: '/sales-order',
    path: '/sales-order/view/:viewType?',
    name: 'Sales Order',
    component: () => import('@/pages/SalesOrder.vue'),
  },
  {
    alias: '/measurement-sheet',
    path: '/measurement-sheet/view/:viewType?',
    name: 'Measurement Sheet',
    component: () => import('@/pages/MeasurementSheet.vue'),
  },
  {
    path: '/measurement-sheet/:sheetId',
    name: 'Measurement Sheet Detail',
    component: () => import('@/pages/MeasurementSheetDetail.vue'),
    props: true,
  },
  {
    alias: '/delivery-schedule',
    path: '/delivery-schedule/view/:viewType?',
    name: 'Delivery Schedule',
    component: () => import('@/pages/DeliverySchedule.vue'),
  },
  {
    alias: '/installation',
    path: '/installation/view/:viewType?',
    name: 'Installation',
    component: () => import('@/pages/Installation.vue'),
  },
  {
    alias: '/invoices',
    path: '/invoices/view/:viewType?',
    name: 'Invoices',
    component: () => import('@/pages/Invoices.vue'),
  },
  {
    alias: '/customers',
    path: '/customers/view/:viewType?',
    name: 'Customers',
    component: () => import('@/pages/Customers.vue'),
  },
  {
    alias: '/suppliers',
    path: '/suppliers/view/:viewType?',
    name: 'Suppliers',
    component: () => import('@/pages/Suppliers.vue'),
  },
  {
    alias: '/fabric-catalog',
    path: '/fabric-catalog/view/:viewType?',
    name: 'Fabric Catalog',
    component: () => import('@/pages/FabricCatalog.vue'),
  },
  {
    alias: '/hardware',
    path: '/hardware/view/:viewType?',
    name: 'Hardware',
    component: () => import('@/pages/Hardware.vue'),
  },
  {
    alias: '/leads',
    path: '/leads/view/:viewType?',
    name: 'Leads',
    component: () => import('@/pages/Leads.vue'),
  },
  {
    path: '/leads/:leadId',
    name: 'Lead',
    component: () => import(`@/pages/${handleMobileView('Lead')}.vue`),
    props: true,
  },
  {
    alias: '/deals',
    path: '/deals/view/:viewType?',
    name: 'Deals',
    component: () => import('@/pages/Deals.vue'),
  },
  {
    path: '/deals/:dealId',
    name: 'Deal',
    component: () => import(`@/pages/${handleMobileView('Deal')}.vue`),
    props: true,
  },
  {
    alias: '/notes',
    path: '/notes/view/:viewType?',
    name: 'Notes',
    component: () => import('@/pages/Notes.vue'),
  },
  {
    alias: '/tasks',
    path: '/tasks/view/:viewType?',
    name: 'Tasks',
    component: () => import('@/pages/Tasks.vue'),
  },
  {
    alias: '/contacts',
    path: '/contacts/view/:viewType?',
    name: 'Contacts',
    component: () => import('@/pages/Contacts.vue'),
  },
  {
    path: '/contacts/:contactId',
    name: 'Contact',
    component: () => import(`@/pages/${handleMobileView('Contact')}.vue`),
    props: true,
  },
  {
    alias: '/items',
    path: '/items/view/:viewType?',
    name: 'Items',
    component: () => import('@/pages/Items.vue'),
  },
  {
    path: '/items/:itemId',
    name: 'Item',
    component: () => import(`@/pages/${handleMobileView('Item')}.vue`),
    props: true,
  },
  {
    alias: '/organizations',
    path: '/organizations/view/:viewType?',
    name: 'Organizations',
    component: () => import('@/pages/Organizations.vue'),
  },
  {
    path: '/organizations/:organizationId',
    name: 'Organization',
    component: () => import(`@/pages/${handleMobileView('Organization')}.vue`),
    props: true,
  },
  {
    alias: '/call-logs',
    path: '/call-logs/view/:viewType?',
    name: 'Call Logs',
    component: () => import('@/pages/CallLogs.vue'),
  },
  {
    path: '/data-import',
    name: 'DataImportList',
    component: () => import('@/pages/DataImport.vue'),
  },
  {
    path: '/data-import/doctype/:doctype',
    name: 'NewDataImport',
    component: () => import('@/pages/DataImport.vue'),
    props: true,
  },
  {
    path: '/data-import/:importName',
    name: 'DataImport',
    component: () => import('@/pages/DataImport.vue'),
    props: true,
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/pages/Welcome.vue'),
  },
  {
    path: '/:invalidpath',
    name: 'Invalid Page',
    component: () => import('@/pages/InvalidPage.vue'),
  },
  {
    path: '/not-permitted',
    name: 'Not Permitted',
    component: () => import('@/pages/NotPermitted.vue'),
  },
]

const handleMobileView = (componentName) => {
  return window.innerWidth < 768 ? `Mobile${componentName}` : componentName
}

let router = createRouter({
  history: createWebHistory('/portal'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = sessionStore()
  const { users, isWebsiteUser } = usersStore()

  if (isLoggedIn && !users.fetched) {
    try {
      await users.promise
    } catch (error) {
      console.error('Error loading users', error)
    }
  }

  if (isLoggedIn && to.name !== 'Not Permitted' && isWebsiteUser()) {
    next({ name: 'Not Permitted' })
  } else if (to.name === 'Home' && isLoggedIn) {
    const { views, getDefaultView } = viewsStore()
    await views.promise

    let defaultView = getDefaultView()
    if (!defaultView) {
      next({ name: 'Leads' })
      return
    }

    let { route_name, type, name, is_standard } = defaultView
    route_name = route_name || 'Leads'

    if (name && !is_standard) {
      next({
        name: route_name,
        params: { viewType: type },
        query: { view: name },
      })
    } else {
      next({ name: route_name, params: { viewType: type } })
    }
  } else if (!isLoggedIn) {
    window.location.href = '/login?redirect-to=/portal'
  } else if (to.matched.length === 0) {
    next({ name: 'Invalid Page' })
  } else if (['Deal', 'Lead'].includes(to.name) && !to.hash) {
    let storageKey = to.name === 'Deal' ? 'lastDealTab' : 'lastLeadTab'
    const activeTab = localStorage.getItem(storageKey) || 'activity'
    const hash = '#' + activeTab
    next({ ...to, hash })
  } else {
    next()
  }
})

export default router
