<template>
  <ChartCard title="水球" :option="(option as EChartsOption)" />
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import { ref } from 'vue'
import ChartCard from '@/components/ChartCard.vue'
import 'echarts-liquidfill'

const data = ref([0.68])

const option = ref<EChartsOption>({
  series: [
      {
        // @ts-ignore
        type: 'liquidFill',
        name: 'rate',
        data,
        color: ['#abf570'],
        label: {
          fontSize: 36,
          color: '#999',
          fontWeight: 'normal',
          // insideColor: 'red', // 重叠颜色
          // formatter: val => {
          //   return `${(val.data * 100).toFixed(2)}%`
          // }
        },
        amplitude: 8,
        radius: '70%',
        itemStyle: {
          shadowBlur: 0,
          shadowColor: '#fff'
        },
        outline: {
          show: false
        },
        backgroundStyle: {
          borderWidth: 1,
          borderColor: '#aaa4a4',
          color: '#fff'
        }
      }
    ]
})
</script>
