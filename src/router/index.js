import { RouterView, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BookTableView from '../views/BookTableView.vue'
import ListMenuView from '../views/ListMenuView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/menu',
            name: 'menu',
            component: ListMenuView,
        },
        {
            path: '/book-a-table',
            name: 'book-a-table',
            component: BookTableView
        },
    ]
})

export default router