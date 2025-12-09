<template>
  <div class="custom-footer-wrapper">
    <div class="friend-links" v-if="footerData.friendLinks && footerData.friendLinks.length">
      <span v-for="(link, index) in footerData.friendLinks" :key="index" class="friend-link-item">
        <a :href="link.href" target="_blank" v-if="link.href">{{ link.label }}</a>
        <span v-else>{{ link.label }}</span>
        <span v-if="index < footerData.friendLinks.length - 1" class="separator">|</span>
      </span>
    </div>
    
    <div class="copyright" v-if="footerData.copyright">
      <span v-if="footerData.copyright.href">
        <a :href="footerData.copyright.href" target="_blank">{{ footerData.copyright.name }}</a>
      </span>
      <span v-else>{{ footerData.copyright.name }}</span>
    </div>
  </div>
</template>

<script setup>
import footerData from '../footer.js'
</script>

<style scoped>
.custom-footer-wrapper {
  padding: 1.5rem 2.5rem;
  border-top: 1px solid var(--c-border);
  text-align: center;
  color: var(--c-text-light);
  font-size: 14px;
  background-color: var(--c-bg);
}

.friend-links {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.friend-link-item {
  display: inline-flex;
  align-items: center;
}

.friend-links a {
  color: var(--c-text);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.friend-links a:hover {
  color: var(--c-brand);
}

.copyright a {
  color: var(--c-text-light);
  text-decoration: none;
  transition: color 0.3s;
}

.copyright a:hover {
  color: var(--c-brand);
}

.separator {
  margin-left: 0.5rem;
  opacity: 0.5;
}
</style>
