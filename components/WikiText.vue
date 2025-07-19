<template>
  <div v-html="formattedContent"></div>
</template>

<script setup lang="ts">
interface Props {
  content: string;
}

const props = defineProps<Props>();

const formattedContent = computed(() => {
  if (!props.content) return '';

  const lines = props.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .split('\n');
  const result: string[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];
  let inSection = false;

  const processInlineMarkup = (text: string): string => {
    // Wiki links [[title|slug]] and [[slug]]
    text = text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a href="/$2">$1</a>');
    text = text.replace(/\[\[([^\]]+)\]\]/g, '<a href="/$1">$1</a>');

    // Images ![alt](url)
    text = text.replace(/!\[([^\]]+)\]\(([^)]+)\)(?:\{(.*?)\})?/g, '<img src="$2" alt="$1" style="$3">');

    // Regular links [title](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Bold *text*
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    // Italic _text_
    text = text.replace(/__([^_]+)__/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Strikethrough ~text~
    text = text.replace(/~([^~]+)~/g, '<del>$1</del>');

    // Inline code `text`
    text = text.replace(/(``+) (.*?) \1|`(.*?)`/g, '<code>$2$3</code>');

    return text;
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(' ');
      result.push(`<p>${processInlineMarkup(content)}</p>`);
      currentParagraph = [];
    }
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      const content = blockquoteLines.map(line => processInlineMarkup(line)).join('<br>');
      result.push(`<blockquote>${content}</blockquote>`);
      blockquoteLines = [];
      inBlockquote = false;
    }
  };

  for (const line of lines) {
    let trimmed = line.trim();
    if (line.endsWith('  ')) {
      trimmed += '<br>';
    }

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        result.push(`<pre><code>${codeBlockLines.join('\n')}</code></pre>`);
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushBlockquote();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Handle css sections
    if (trimmed.startsWith(':: ') && trimmed.length > 3) {
      flushParagraph();
      if (inSection) {
        result.push('</section>');
      }
      result.push('<section class="box">');
      inSection = true;
      continue;
    } else if (trimmed == '::') {
      flushParagraph();
      result.push('</section>');
      inSection = false;
      continue;
    }

    // Handle blockquotes
    if (trimmed.startsWith('&gt; ')) {
      flushParagraph();
      if (!inBlockquote) {
        inBlockquote = true;
      }
      blockquoteLines.push(trimmed.substring(5));
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Handle headings
    if (trimmed.startsWith('#### ')) {
      flushParagraph();
      result.push(`<h4>${processInlineMarkup(trimmed.substring(5))}</h4>`);
      continue;
    } else if (trimmed.startsWith('### ')) {
      flushParagraph();
      result.push(`<h3>${processInlineMarkup(trimmed.substring(4))}</h3>`);
      continue;
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      result.push(`<h2>${processInlineMarkup(trimmed.substring(3))}</h2>`);
      continue;
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      result.push(`<h1>${processInlineMarkup(trimmed.substring(2))}</h1>`);
      continue;
    }

    // Handle lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('+ ') || trimmed.startsWith('* ')) {
      flushParagraph();
      result.push(`<ul><li>${processInlineMarkup(trimmed.substring(2))}</li></ul>`);
      continue;
    }

    // Handle empty lines
    if (trimmed === '') {
      flushParagraph();
      continue;
    }

    if (trimmed === '---') {
      flushParagraph();
      result.push('<hr>');
      continue;
    }

    // Regular paragraph content
    currentParagraph.push(trimmed);
  }

  // Flush any remaining content
  flushParagraph();
  flushBlockquote();

  if (inSection) {
    result.push('</section>');
  }

  // Merge consecutive list items
  let html = result.join('');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  return html;
});
</script>

<style scoped>
:deep(h1) {
  font-size: 32px;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 36px;
}

:deep(h2) {
  font-size: 28px;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 32px;
}

:deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 28px;
}

:deep(h4) {
  font-size: 20px;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
  line-height: 24px;
}

:deep(p) {
  margin: 0.5em 0;
}

:deep(ul) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

:deep(li) {
  margin: 0.25em 0;
}

:deep(section) {
  margin: 1em 0;
  padding: .75em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

:deep(section :first-child) {
  margin-top: 0;
}

:deep(section :last-child) {
  margin-bottom: 0;
}

:deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #ccc;
  background-color: #f9f9f9;
  font-style: italic;
}

:deep(pre) {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1em;
  overflow-x: auto;
  margin: 1em 0;
}

:deep(code) {
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

:deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

:deep(strong) {
  font-weight: 600;
}

:deep(em) {
  font-style: italic;
}

:deep(del) {
  text-decoration: line-through;
}

:deep(a) {
  color: coral;
  font-weight: 600;
}

:deep(hr) {
  border: none;
  border-bottom: 1px solid coral;
}
</style>