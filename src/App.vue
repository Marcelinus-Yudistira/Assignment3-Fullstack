<script>
import {ref} from 'vue';
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark-transparent  shadow-1-strong">
      <div class="container-fluid ms-3 me-3">
        <a class="navbar-brand" href="#">Marcel Resto MR</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav  ms-auto">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/menu">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/book-a-table">Book a Table</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
      <RouterView/>
  </main>
</template>

<style scoped>
  .bg-dark-transparent {
    background-color: rgba(0, 0, 0, 0.7); /* Ubah nilai alpha sesuai kebutuhan transparansi */
  }  

  
</style>
