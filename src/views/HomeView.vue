<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="mainHome">

        <div class="col-8 text-white" style="margin-top: 190px;">
            <div class="row">
                <div class="col-6">
                    <h2 >Marcel Resto MR</h2>
                    <p>
                        Introducing our delightful restaurant: a haven where savory delights meet swift service 
                        and wallet-friendly prices. Nestled in the heart of Yogyakarta, our restaurant promises a 
                        culinary experience like no other.
                    </p>
                    <button class="btn btn-success"><a href="/book-a-table">Book a Table</a></button>
                </div>
                <div class="col-6" style="display: flex; justify-content: center;">
                    <img src="/src/assets/img/hamburger 2.png" class="rounded-image" alt="" width="300px">
                </div>
            </div>
        </div>
        <!-- <div class="offset-1 col-5">
            <img src="/src/assets/img/hamburger 2.png" class="rounded-image" alt="" width="300px">
        </div> -->
    </div>
</template>

<style>
.mainHome{
    display: flex;
    justify-content: center;
}

a{
    color: white;
}
</style>