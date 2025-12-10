<template>
  <div class="sidebar-resizer" ref="resizer" @mousedown="startResize"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const resizer = ref(null)
const sidebar = ref(null)
const startX = ref(0)
const startY = ref(0)
const startWidth = ref(0)
const startScrollTop = ref(0)
const isResizing = ref(false)
const observer = ref(null)

// Selectors to try for the sidebar
// .series-container is common in Reco 2.x
// .sidebar is common in default theme
const SIDEBAR_SELECTORS = ['.series-container', 'aside.sidebar']

const init = () => {
  // Try to find the sidebar
  let el = null
  for (const selector of SIDEBAR_SELECTORS) {
    el = document.querySelector(selector)
    if (el) break
  }
  
  if (el) {
    sidebar.value = el
    updateResizerPosition()
    
    // Restore saved width
    const savedWidth = localStorage.getItem('sidebar-width')
    if (savedWidth) {
      applyWidth(parseInt(savedWidth))
    }
    
    // Observe sidebar for changes (e.g. toggle)
    if (observer.value) observer.value.disconnect()
    observer.value = new ResizeObserver(() => {
      updateResizerPosition()
    })
    observer.value.observe(el)
  }
}

const RESIZER_WIDTH = 12

const updateResizerPosition = () => {
  if (!sidebar.value || !resizer.value) return
  
  // Check if sidebar is visible
  const style = window.getComputedStyle(sidebar.value)
  if (style.display === 'none' || style.visibility === 'hidden') {
    resizer.value.style.display = 'none'
    return
  } else {
    resizer.value.style.display = 'block'
  }

  const rect = sidebar.value.getBoundingClientRect()
  resizer.value.style.position = 'fixed'
  
  // Position it inside the sidebar on the right edge
  resizer.value.style.left = `${rect.right - RESIZER_WIDTH}px` 
  resizer.value.style.top = `${rect.top}px`
  resizer.value.style.height = `${rect.height}px`
  resizer.value.style.width = `${RESIZER_WIDTH}px`
}

const startResize = (e) => {
  e.preventDefault() // Prevent text selection
  isResizing.value = true
  startX.value = e.clientX
  startY.value = e.clientY
  const rect = sidebar.value.getBoundingClientRect()
  startWidth.value = rect.width
  // Capture window scroll position instead of sidebar scroll
  startScrollTop.value = window.scrollY || document.documentElement.scrollTop
  
  document.body.style.cursor = 'move' // Change cursor to indicate both directions
  document.body.style.userSelect = 'none'
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  
  // Add a class to body to indicate resizing (optional, for styling)
  document.body.classList.add('is-resizing-sidebar')
}

const handleMouseMove = (e) => {
  if (!isResizing.value) return
  
  // Horizontal resize
  const diffX = e.clientX - startX.value
  const newWidth = startWidth.value + diffX
  
  // Constraints
  if (newWidth > 150 && newWidth < 800) {
    applyWidth(newWidth)
  }

  // Vertical scroll
  const diffY = e.clientY - startY.value
  // Factor can be adjusted. 1 means 1px mouse move = 1px scroll.
  // Using 2 makes scrolling faster and easier.
  // Scroll the window (main content) instead of sidebar
  window.scrollTo(0, startScrollTop.value + diffY * 2)
}

const applyWidth = (width) => {
  if (!sidebar.value) return
  
  // Strategy 1: CSS Variable (if supported)
  // Reco theme might use --series-width or similar. We try generic ones.
  document.documentElement.style.setProperty('--sidebar-width', `${width}px`)
  document.documentElement.style.setProperty('--series-width', `${width}px`) // Reco specific guess
  
  // Strategy 2: Direct style manipulation
  sidebar.value.style.width = `${width}px`
  // Add padding to prevent content from being covered by the resizer
  sidebar.value.style.paddingRight = `${RESIZER_WIDTH}px`
  
  // Strategy 3: Adjust content padding/margin
  // We need to find the content container.
  // In Reco 2.x, it might be .page-container or .page
  const contentSelectors = ['.page-container', '.page', '.content']
  contentSelectors.forEach(s => {
    const el = document.querySelector(s)
    if (el) {
      // Check if it's using margin or padding
      const style = window.getComputedStyle(el)
      if (parseInt(style.paddingLeft) > 0) {
         el.style.paddingLeft = `${width}px`
      }
      if (parseInt(style.marginLeft) > 0) {
         el.style.marginLeft = `${width}px`
      }
    }
  })

  localStorage.setItem('sidebar-width', width)
  updateResizerPosition()
}

const stopResize = () => {
  isResizing.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
  document.body.classList.remove('is-resizing-sidebar')
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  // Give some time for VuePress to render the sidebar
  setTimeout(init, 500)
  
  window.addEventListener('resize', updateResizerPosition)
  window.addEventListener('scroll', updateResizerPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResizerPosition)
  window.removeEventListener('scroll', updateResizerPosition)
  if (observer.value) observer.value.disconnect()
})

// Watch route changes to re-init if sidebar is recreated
watch(
  () => route.path,
  () => {
    setTimeout(init, 500)
  }
)
</script>

<style scoped>
.sidebar-resizer {
  /* Width is set dynamically in JS */
  background-color: rgba(0, 0, 0, 0.05); /* Subtle track-like appearance */
  cursor: move;
  z-index: 10000;
  transition: background-color 0.2s;
  /* border-left: 1px solid rgba(0,0,0,0.05); */
}

.sidebar-resizer:hover,
.sidebar-resizer:active {
  background-color: rgba(0, 0, 0, 0.15); /* Darker on hover/active */
}

/* Dark mode adaptation if possible */
html.dark .sidebar-resizer {
  background-color: rgba(255, 255, 255, 0.05);
}
html.dark .sidebar-resizer:hover,
html.dark .sidebar-resizer:active {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
