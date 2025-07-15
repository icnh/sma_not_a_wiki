<script setup lang="ts">
const { params: { slug } } = useRoute();
const { data: page } = useFetch<Page>(`/api/pages/${slug}`);

function capitalize(str: any) {
    return String(str).split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join(' ');
}
</script>

<template>
    <article>
        <h1>{{ page?.title ?? capitalize(slug) }}</h1>
        <pre>{{ page?.content ?? 'There is no such page yet.' }}</pre>

        <footer>
            <a class="btn" href="#">{{ page ? 'Edit' : 'Create' }}</a>
        </footer>
    </article>
</template>

<style>
article {
    max-width: 60pc;
    margin: 1em auto;
}
</style>