<template>
  <div class="chart-card w-full h-full rounded-md border bg-white shadow pb-3">
    <h4 class="text-lg color text-black ml-6 mt-6">{{ title }}</h4>
    <v-chart class="h-[calc(100%_-_2.4rem)]" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { EChartsOption } from 'echarts'

interface IProps {
  title: string;
  option: EChartsOption
  // option: typeof ref<EChartsOption>
}
defineProps<IProps>()
</script>

<style scoped>

</style>