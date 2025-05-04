import { createRouter, createWebHashHistory } from 'vue-router';
import Menu from './components/Menu.vue';
import Pedidos from './components/Pedidos.vue';
import Estoque from './components/Estoque.vue';
import Mesas from './components/Mesas.vue';

const routes = [
  { path: '/', component: Menu },
  { path: '/pedidos', component: Pedidos },
  { path: '/estoque', component: Estoque },
  { path: '/mesas', component: Mesas}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
