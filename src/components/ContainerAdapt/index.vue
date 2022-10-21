<template>
  <div id="container-adapt" ref="containerRef">
    <template v-if="ready">
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  options: Object
})

const containerRef = ref(null)
const width = ref(0)
const height = ref(0)
const originalWidth = ref(0)
const originalHeight = ref(0)
let dom: HTMLElement | null
const ready = ref(false)

const initSize = () => {
  return new Promise((resolve) => {
    nextTick(() => {
      dom = containerRef.value
      if (props.options && props.options.width && props.options.height) {
        width.value = props.options.width
        height.value = props.options.height
      }
      if (!originalHeight.value || !originalWidth.value) {
        originalWidth.value = screen.width
        originalHeight.value = screen.height
      }
      resolve(1)
    })
  })
}

const updateSize = () => {
  if (!dom) return
  if (width.value && height.value) {
    dom.style.width = `${width.value}px`
    dom.style.height = `${height.value}px`
  } else {
    dom.style.width = `${originalWidth.value}px`
    dom.style.height = `${originalHeight.value}px`
  }
}

const updateScale = () => {
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  const realWidth = width.value || originalWidth.value
  const realHeight = height.value || originalHeight.value
  const widthScale = currentWidth / realWidth
  const heightScale = currentHeight / realHeight
  if (dom) dom.style.transform = `scale(${widthScale}, ${heightScale})`
}

const onResize = async () => {
  await initSize()
  updateScale()
}

const debounceResize = useDebounceFn(onResize, 100)

let observer: MutationObserver | null
const initMutationObserver = () => {
  if (!dom) return
  observer = new MutationObserver(onResize)
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })
}

const removeMutationObserver = () => {
  if (observer) {
    observer.disconnect()
    observer.takeRecords()
    observer = null
  }
}

onMounted(async () => {
  ready.value = false
  await initSize()
  updateSize()
  updateScale()
  window.addEventListener('resize', debounceResize)
  initMutationObserver()
  ready.value = true
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', debounceResize)
  removeMutationObserver()
})
</script>

<!-- <script>
export default {
  name: 'ImoocContainer'
}
</script> -->

<style lang="scss" scoped>
#container-adapt {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: top left;
}
</style>
