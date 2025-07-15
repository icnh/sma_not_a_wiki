<script setup lang="ts">
const { params: { slug } } = useRoute();
</script>

<template>
    <article>
        <h1>This is page <u>{{ slug }}</u>.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci molestias qui fugit magnam nobis quam
            eaque, sint quidem, atque saepe rerum placeat iste aut ratione necessitatibus excepturi, nostrum consequatur
            a!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias at ab debitis officiis perferendis ducimus
            delectus soluta architecto nesciunt temporibus sed voluptatibus deleniti minima odit in nemo, quaerat vel
            voluptates?</p>

        <footer>
            <a class="btn" href="#">Edit</a>
        </footer>
    </article>
</template>

<style>
article {
    max-width: 60pc;
    margin: 1em auto;
}
</style>