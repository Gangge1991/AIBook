<template>
  <div class="person-cards__container">
    <MagicCard
      class="person-cards__item"
      v-for="(item, index) in items"
      :key="index"
      :style="{ '--card-bg-img': `url(${item.image})` }"
      @click="navigate(item.link)"
    >
      <h4>{{ item.title }}</h4>
      <p v-if="item.desc">{{ item.desc }}</p>
    </MagicCard>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

const navigate = (link) => {
  if (link) {
    if (link.startsWith('http')) {
      window.open(link, '_blank')
    } else {
      router.push(link)
    }
  }
}
</script>

<style scoped>
.person-cards__item {
  cursor: pointer;
}
</style>
