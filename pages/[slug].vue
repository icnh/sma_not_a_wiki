<script setup lang="ts">
    const { params: {slug} } = useRoute();
</script>

<template>
    <h1>This is page <u>{{ slug }}</u>.</h1>
</template>