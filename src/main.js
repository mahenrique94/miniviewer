import Vue from 'vue'
import App from './containers/App.vue'

import { router } from '@routes'

import { i18n } from '@i18n'

import '@cfg/style'

Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app')
