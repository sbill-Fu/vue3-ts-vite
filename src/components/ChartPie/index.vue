<template>
  <ChartCard title="占比" :option="(option as EChartsOption)" />
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import ChartCard from '@/components/ChartCard.vue'

const option = ref<EChartsOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '比例',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        formatter: () => '占比',
        fontSize: 28
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        borderWidth: 4,
        borderColor: '#fff'
      },
      data: [
        { value: 50, name: 'JavaScript' },
        { value: 40, name: 'Vue' },
        { value: 10, name: 'CSS' },
      ]
    }
  ]
})
</script>
