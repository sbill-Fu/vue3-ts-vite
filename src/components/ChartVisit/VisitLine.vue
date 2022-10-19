<template>
  <div class="visit-line w-full h-full rounded-md border bg-white shadow pb-3">
    <h4 class="text-lg color text-black ml-6 mt-6">周访问量</h4>
    <v-chart :option="option" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useVisit } from './data'

const data = useVisit()

const option = ref({
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {},
  series: [
    {
      type: 'line',
      data: data.value
    }
  ]
})
</script>
