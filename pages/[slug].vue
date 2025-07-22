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

@media print {
    .btn {
        display: none;
    }

    article {
        max-width: inherit;
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4 {
        break-after: avoid;
    }

    @page {
        margin: 2cm 2cm 3cm 2cm;

        @bottom-center {
            content: counter(page);
            font-size: 0.9em;
        }
    }
}
</style>