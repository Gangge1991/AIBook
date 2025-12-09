<template>
  <div v-if="showButton" 
       class="sidebar-toggle-btn" 
       :class="{ 'is-hidden': isHidden }"
       @click="toggleSidebar" 
       :title="isHidden ? '显示侧边栏' : '隐藏侧边栏'">
    <!-- Icon for Close (Left Arrow) -->
    <svg v-if="!isHidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <!-- Icon for Open (Menu/Right Arrow) -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'

const frontmatter = usePageFrontmatter()
const isHidden = ref(false)

const showButton = computed(() => {
  // Only show on non-home pages
  return !frontmatter.value?.home
})

const toggleSidebar = () => {
  isHidden.value = !isHidden.value
  if (isHidden.value) {
    document.body.classList.add('sidebar-hidden')
  } else {
    document.body.classList.remove('sidebar-hidden')
  }
}
</script>

<style scoped>
.sidebar-toggle-btn {
  position: fixed;
  bottom: 80px;
  left: 17rem; /* Default position when sidebar is open (16rem + 1rem) */
  z-index: 50; /* Above sidebar content but below modals */
  width: 40px;
  height: 40px;
  background-color: var(--c-bg-light, #ffffff);
  color: var(--c-text, #2c3e50);
  border: 1px solid var(--c-border, #eaecef);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.sidebar-toggle-btn:hover {
  background-color: var(--c-brand, #3eaf7c);
  color: #fff;
  border-color: var(--c-brand, #3eaf7c);
}

.sidebar-toggle-btn.is-hidden {
  left: 1rem; /* Position when sidebar is hidden */
}

@media (max-width: 768px) {
  .sidebar-toggle-btn {
    display: none;
  }
}
</style>
