<script setup lang="">
import markdownit from 'markdown-it';

const md = markdownit();
const articleRaw = await import('./nuxt-ssr-1.md?raw').then((m) => m.default);
const articleHtml = md.render(articleRaw);
</script>

<template>
  <section class="article">
    <div v-html="articleHtml"></div>
  </section>
</template>

<style lang="scss">
.article {
  /* Стили для Markdown контента */
  h1,
  h2,
  h3 {
    margin: 1em 0 0.5em;
  }
  code {
    background: #f5f5f5;
    padding: 2px 6px;
  }
  pre {
    background: #f5f5f5;
    padding: 1em;
    overflow: auto;
  }
  blockquote {
    border-left: 4px solid #ccc;
    padding-left: 1em;
    margin-left: 0;
  }
}
</style>
