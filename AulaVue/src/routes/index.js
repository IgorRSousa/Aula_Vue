import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // Modelo de Rota
    { path: '/', name: "Home", component: () => import('../views/Home.vue')},
    { path: '/cadastro', name: "Cadastro", component: () => import('../views/Cadastro.vue')}, 
    { path: '/usuarios', name: "usuarios", component: () => import('../views/ListarUsuarios.vue')}, 
    { path: '/produtos', name: "produtos", component: () => import('../views/ListarProdutos.vue')}, 
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;