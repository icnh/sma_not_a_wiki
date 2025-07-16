<script setup lang="ts">
const { params: { slug } } = useRoute();
const { data: page } = useFetch<Page>(`/api/pages/${slug}`);

const title = ref('');
const content = ref('');
const saving = ref(false);

// Initialize form data when page loads
watch(page, (newPage) => {
    if (newPage) {
        title.value = newPage.title;
        content.value = newPage.content;
    } else {
        title.value = '';
        content.value = '';
    }
}, { immediate: true });

const savePage = async () => {
    if (!title.value.trim() || !content.value.trim()) {
        alert('Title and content are required');
        return;
    }

    saving.value = true;
    try {
        await $fetch(`/api/pages/${slug}`, {
            method: 'PUT',
            body: {
                title: title.value,
                content: content.value,
            },
        });

        await navigateTo(`/${slug}`);
    } catch (error) {
        console.error('Error saving page:', error);
        alert('Error saving page');
    } finally {
        saving.value = false;
    }
};
</script>

<template>
    <div class="editor-container">
        <h1>{{ page ? 'Edit' : 'Create' }} /{{ slug }}</h1>

        <div class="editor-layout">
            <div class="editor-panel">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input id="title" v-model="title" type="text" placeholder="Page title" class="title-input" />
                </div>

                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea id="content" v-model="content" placeholder="Enter wiki content..."
                        class="content-textarea"></textarea>
                </div>
            </div>
            
            <div class="preview-panel">
                <label>Preview</label>
                <div class="preview-content">
                    <h1>{{ title }}</h1>
                    <WikiText :content="content" />
                </div>
            </div>
        </div>

        <footer>
            <NuxtLink class="btn btn-secondary" :to="`/${slug}`">Cancel</NuxtLink>
            <button class="btn" @click="savePage" :disabled="saving">
                {{ saving ? 'Saving...' : (page ? 'Save' : 'Create') }}
            </button>
        </footer>
    </div>
</template>

<style lang="css" scoped>
.editor-container {
    height: 95vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 1em;
}

.editor-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    flex: 1;
    min-height: 0;
}

.editor-panel {
    display: flex;
    flex-direction: column;
    gap: 1em;
    min-height: 0;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group:last-child {
    flex: 1;
    min-height: 0;
}

label {
    font-weight: 600;
    letter-spacing: .5px;
    font-size: 0.85em;
    margin-bottom: 0.5em;
}

input[type=text] {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
    font-family: 'Courier New', monospace;
}

textarea {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
    font-family: 'Courier New', monospace;
    resize: none;
    flex: 1;
    min-height: 0;
}

.preview-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.preview-content {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    overflow-y: auto;
    min-height: 0;
}

footer {
    display: flex;
    gap: 1em;
    align-items: center;
    margin-top: 1em;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .editor-layout {
        grid-template-columns: 1fr;
    }
}
</style>