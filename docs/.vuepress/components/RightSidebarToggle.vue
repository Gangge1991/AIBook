<template>
  <div v-if="showButton" 
       class="right-sidebar-toggle-btn" 
       :class="{ 'is-hidden': isHidden }"
       @click="toggleSidebar" 
       :title="isHidden ? '显示右侧导航' : '隐藏右侧导航'">
    <!-- Icon for Open (Left Arrow / Menu) when hidden -->
    <svg v-if="isHidden" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <!-- Icon for Close (Right Arrow) when visible -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
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
    document.body.classList.add('right-sidebar-hidden')
  } else {
    document.body.classList.remove('right-sidebar-hidden')
  }
}
</script>

<style scoped>
.right-sidebar-toggle-btn {
  position: fixed;
  top: 20%;
  right: 14rem; /* Default position when sidebar is open */
  z-index: 50;
  width: 20px;
  height: 20px;
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

.right-sidebar-toggle-btn:hover {
  background-color: var(--c-brand, #3eaf7c);
  color: #fff;
  border-color: var(--c-brand, #3eaf7c);
}

.right-sidebar-toggle-btn.is-hidden {
  right: 1rem; /* Position when sidebar is hidden */
}

@media (max-width: 768px) {
  .right-sidebar-toggle-btn {
    display: none;
  }
}
</style>
