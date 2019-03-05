import Vue from "vue"
import VueI18n from "vue-i18n"

import { messages } from './languages/'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages
})

export { i18n }
