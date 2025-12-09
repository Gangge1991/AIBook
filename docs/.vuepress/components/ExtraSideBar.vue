<template>
  <div class="extra-sidebar">
    <div v-for="(item, index) in items" :key="index" class="extra-sidebar-item">
      <div class="item-icon">
        <img v-if="item.icon" :src="item.icon" :alt="item.title" />
        <span v-else>{{ item.title }}</span>
      </div>
      
      <!-- Popover -->
      <div class="item-popover" v-if="item.popoverTitle || item.popoverUrl || item.popoverDesc">
        <div v-if="item.popoverTitle" class="popover-title" v-html="item.popoverTitle"></div>
        <div v-if="item.popoverUrl" class="popover-image">
           <img :src="item.popoverUrl" alt="qrcode" />
        </div>
        <div v-if="item.popoverDesc" class="popover-desc">{{ item.popoverDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import items from '../extraSideBar'
</script>

<style scoped>
.extra-sidebar {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.extra-sidebar-item {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: var(--c-bg, #fff);
  border: 1px solid var(--c-border, #eaecef);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.extra-sidebar-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.item-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.item-popover {
  position: absolute;
  right: 120%; /* Position to the left of the icon */
  bottom: 0; /* Align bottom */
  width: 200px;
  background-color: var(--c-bg, #fff);
  border: 1px solid var(--c-border, #eaecef);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateX(10px);
  transition: all 0.3s;
  text-align: center;
  z-index: 1001;
}

.extra-sidebar-item:hover .item-popover {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.popover-title {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.popover-image img {
  width: 100%;
  height: auto;
  display: block;
}

.popover-desc {
  font-size: 0.8rem;
  color: var(--c-text-light, #666);
  margin-top: 5px;
}

@media (max-width: 768px) {
  .extra-sidebar {
    display: none;
  }
}
</style>
