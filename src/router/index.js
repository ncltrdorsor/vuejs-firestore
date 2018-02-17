import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewProduct from '@/components/NewProduct'
import EditProduct from '@/components/EditProduct'
import ViewProduct from '@/components/ViewProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct
    },
    {
      path: '/edit/:ID',
      name: 'edit-product',
      component: EditProduct
    },
    {
      path: '/:ID',
      name: 'view-product',
      component: ViewProduct
    },    
  ]
})
