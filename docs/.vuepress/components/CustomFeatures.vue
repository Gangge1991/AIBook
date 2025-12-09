<template>
  <div class="features__container">
    <MagicCard
      class="features__item"
      v-for="(item, index) in data"
      :key="index"
      @click="navigate(item.link)"
      :style="{ '--feature-hover-img': `url(${item.hoverImage || '/封面.jpg'})` }"
    >
      <h4>{{ item.title }}</h4>
      <p>{{ item.details }}</p>
    </MagicCard>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePageFrontmatter } from 'vuepress/client'
import { useRouter } from 'vue-router'

const frontmatter = usePageFrontmatter()
const router = useRouter()

const data = computed(() => frontmatter.value.features || [])

const navigate = (link) => {
  if (link) {
    router.push(link)
  }
}
</script>

<style scoped>
.features__item {
  cursor: pointer;
}
</style>
