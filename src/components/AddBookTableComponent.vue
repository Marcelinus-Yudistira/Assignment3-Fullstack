<script setup>
import { ref, onMounted } from 'vue';
import { useBookingTableStore } from '@/stores/bookTable';

  const bookingTableStore = useBookingTableStore()
  const bookings = ref([]);

  const peopleCounts = ref([1, 2, 3, 4, 5, 6, 7]);
  const submittedSuccessfully = ref(false);

  const newBooking = ref({
    name: '',
    email: '',
    people: '',
    booking_date: '',
    special_request: ''
  });

  onMounted(async () => {
    await fetchData()
  })

  async function fetchData() {
    bookings.value = await bookingTableStore.fetchBookingItems();
  }

  async function save() {
    await bookingTableStore.createBooking(newBooking.value);
    await fetchData();
    submittedSuccessfully.value = true;
    reset();
  }

  function reset() {
    newBooking.value.name = '';
    newBooking.value.email = '';
    newBooking.value.people = '';
    newBooking.value.booking_date = '';
    newBooking.value.special_request = '';
  }
</script>

<template>
  <div class="container">
    <h2 class="mt-5 mb-4 text-white text-center">Restaurant Booking Table</h2>
    <div v-if="submittedSuccessfully" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      Booked Data submitted successfully!
      <button type="button" class="btn-close" @click="submittedSuccessfully = false" aria-label="Close"></button>
    </div>
    <form @submit.prevent="save" class="row g-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="newBooking.name" required>
      </div>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="newBooking.email" required>
      </div>
      <div class="col-md-6">
        <label for="date" class="form-label">Date</label>
        <input type="date" class="form-control" id="date" v-model="newBooking.booking_date" required>
      </div>
      <div class="col-md-6">
        <label for="people" class="form-label">Number of People</label>
        <select class="form-select" id="people" v-model="newBooking.people" required>
          <option disabled value="">Select Number of People</option>
          <option v-for="count in peopleCounts" :key="count" :value="count">{{ count }}</option>
        </select>
      </div>
      <div class="col-12">
        <label for="specialRequest" class="form-label">Special Request</label>
        <textarea class="form-control" id="specialRequest" rows="3" v-model="newBooking.special_request"></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </div>
    </form>
  </div>
</template>

<style>
.form-label{
  color: white;
}
</style>
  
  