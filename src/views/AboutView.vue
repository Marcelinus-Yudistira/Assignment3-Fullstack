<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="about"></div>
    <h1>This is About Page</h1>
    <nav>
        <RouterLink to="/about/about-me">About Me</RouterLink>
        <RouterLink to="/about/about-company">About Company</RouterLink>
    </nav>
    <RouterView/>
</template>