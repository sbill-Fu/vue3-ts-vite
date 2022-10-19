<template>
  <ChartCard title="周访问量" :option="(option as EChartsOption)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { EChartsOption } from 'echarts'
import { useVisit } from './data'
import ChartCard from '@/components/ChartCard.vue'

const data = useVisit()

const option = ref<EChartsOption>({
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: data.value
    }
  ]
})

</script>
