
import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useBookingTableStore = defineStore('bookTableStore', () => {
    const bookingsTable = ref([])

    const fetchBookingItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/bookings');
            return await response.json();
        } catch (error) {
            console.error('Error fetching booking table items:', error);
            throw error;
        }
    };

    const getDetail = async (id) => {
        try {
            const response = await await fetch(`http://localhost:3000/bookings/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching booking table items:', error);
            throw error;
        }
    };

    async function createBooking(newBooking) {
        try {
            const currentBookingItems = await fetchBookingItems();
            const currentBookingCount = currentBookingItems.length + 1;

            newBooking.created_at = new Date().toISOString();
            newBooking.id = currentBookingCount;
            const response = await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBooking)
            })
            await response.json()
        } catch (error) {
            console.error('Error creating booking data:', error)
        }
    }

    async function editBooking(booking) {
        try {
            const response = await fetch(`http://localhost:3000/bookings/${booking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });
            await response.json();
            await fetchMenuItems();
        } catch (error) {
            console.error('Error editing booking data:', error);
        }
    }

    return {bookingsTable, fetchBookingItems, createBooking, editBooking, getDetail}
})
