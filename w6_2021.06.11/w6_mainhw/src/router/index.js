import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import ProductsList from '../views/front/ProductsList.vue'

const routes = [{
  path: '/ProductsList',
  name: 'ProductsList',
  component: ProductsList
},
// 單一product也要進路由表，但是用動態id
{
  path: '/product/:id',
  name: 'product',
  component: () => import('../views/front/Product.vue')
},
{
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "about" */'../views/front/About.vue')
},
{
  path: '/cart',
  name: 'cart',
  component: () => import('../views/front/Cart.vue')
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/front/Login.vue')
},
// 後台登入
{
  path: '/dashboard',
  component: () => import('../views/back/Dashboard.vue'),
  // 後台的槽狀結構
  children: [
    {
      path: '/loginBack',
      name: 'loginBack',
      component: () => import('../views/back/LoginBack.vue')
    },
    {
      path: 'productsList',
      component: () => import('../views/back/ProductsList.vue')
    }
  ]
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
