<script setup lang="ts">
const { params: { slug } } = useRoute();
const { data: page } = useFetch<Page>(`/api/pages/${slug}`);

useHead({
    title: page.value?.title ?? 'Not a Wiki'
});
</script>

<template>
    <article>
        <h1>{{ page?.title ?? `/${slug}` }}</h1>
        <WikiText :content="page?.content ?? 'There is no such page yet.'" />

        <footer>
            <NuxtLink class="btn" :to="`/edit/${slug}`">{{ page ? 'Edit' : 'Create' }}</NuxtLink>
        </footer>
    </article>
</template>

<style>
article {
    max-width: 60pc;
    margin: 1em auto;
    padding: 0 1em;
}
</style>