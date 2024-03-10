<script setup>
    import ListMenuComponent from '@/components/ListMenuComponent.vue';
    import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
    <div class="menu-list">
        <div class="col-8">
            <h1 class="text-center mt-3 mb-3">Our Awesome Menu</h1>
            <ListMenuComponent></ListMenuComponent>
        </div>
    </div>
    <FooterComponent></FooterComponent>
</template>

<style>
.menu-list{
    display: flex;
    justify-content: center;
    background-color:beige;
}

</style>

  