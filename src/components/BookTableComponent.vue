<script setup>
import { ref, onMounted } from 'vue';
import { useBookingTableStore } from '@/stores/bookTable';

const bookingTableStore = useBookingTableStore()
const bookings = ref([]);

onMounted(async () => {
    await fetchData()
})

async function fetchData() {
  bookings.value = await bookingTableStore.fetchBookingItems();
}
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <table class="table table-dark table-bordered">
      <thead>
        <tr>
          <th scope="col">Id Booking</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">People Count</th>
          <th scope="col">Booking Date</th>
          <th scope="col">Special Request</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-secondary" v-for="booking in bookings">
          <td scope="row">{{ booking.id }}</td>
          <td>{{ booking.name }}</td>
          <td>{{ booking.email }}</td>
          <td>{{ booking.people }}</td>
          <td>{{ booking.booking_date }}</td>
          <td>{{ booking.special_request }}</td>
        </tr>
      </tbody>
    </table>
</div>
</template>
  