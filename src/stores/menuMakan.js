
import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useMenuStore = defineStore('menuStore', () => {
    const menuItems = ref([])

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/menu');
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    };

    const getDetail = async (id) => {
        try {
            const response = await await fetch(`http://localhost:3000/menu/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    };

    async function createMenu(newMenu) {
        try {
            const currentMenuItems = await fetchMenuItems();
            const currentMenuCount = currentMenuItems.length + 1;

            newMenu.id = currentMenuCount.toString();
            const response = await fetch('http://localhost:3000/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMenu)
            })
            await response.json()
        } catch (error) {
            console.error('Error creating menu:', error)
        }
    }

    async function editMenu(menu) {
        try {
            const response = await fetch(`http://localhost:3000/menu/${menu.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menu)
            });
            await response.json();
            await fetchMenuItems();
        } catch (error) {
            console.error('Error editing menu:', error);
        }
    }

    return {menuItems, fetchMenuItems, createMenu, editMenu, getDetail}
})
