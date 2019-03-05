import Vue from 'vue'
import VueRouter from 'vue-router'

import { routes as callRoutes } from '@features/call/routes'
import { routes as homeRoutes } from '@features/home/routes'

const routes = [
    ...callRoutes,
    ...homeRoutes
]

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

export { router }
