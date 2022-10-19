<template>
  <div class="h-full">
    <h4 class="visit-count text-black-50 mb-4">
      访问量：
      <count-to :startVal='0' :endVal='1999' :duration=4000></count-to>
    </h4>
    <ChartVisit />
    <div class="flex my-4 gap-2">
      <ChartPie class="w-6/12 h-96" />
      <ChartLiquid class="w-6/12 h-96" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountTo } from 'vue3-count-to'
import ChartVisit from '@/components/ChartVisit/index.vue'
import ChartPie from '@/components/ChartPie/index.vue'
import ChartLiquid from '@/components/ChartLiquid/index.vue'


</script>

<style lang="scss" scoped>

</style>