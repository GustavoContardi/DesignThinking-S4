import { createApp } from 'vue'

// Tipografias empaquetadas localmente: la presentacion funciona sin internet.
import '@fontsource-variable/inter'
import '@fontsource-variable/bricolage-grotesque'

import './styles/tokens.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/layout.css'

import App from './App.vue'

createApp(App).mount('#app')
