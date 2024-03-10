  <script setup>
  import AddBookTableComponent from '@/components/AddBookTableComponent.vue';
  import BookTableComponent from '@/components/BookTableComponent.vue';
  </script>

<template>
  <div class="book-table">
    <div class="col-8">
      <AddBookTableComponent></AddBookTableComponent>
      <!-- <BookTableComponent></BookTableComponent> -->
    </div>
  </div>
</template>
  
<style>
.book-table{
  display: flex;
  justify-content: center;
}
</style>