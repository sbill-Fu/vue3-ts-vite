<template>
  <div class="chart-visit h-full flex justify-between gap-2">
    <VisitBar class="w-6/12 h-96" />
    <VisitLine class="w-6/12 h-96" />
  </div>
</template>

<script setup lang="ts">
import VisitBar from '@/components/ChartVisit/VisitBar.vue'
import VisitLine from '@/components/ChartVisit/VisitLine.vue'

</script>

<style lang="scss" scoped>

</style>