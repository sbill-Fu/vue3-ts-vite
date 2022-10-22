<template>
  <div class="screen-data">
    <ContainerAdapt>
      <v-chart :option="option" />
    </ContainerAdapt>
  </div>
</template>

<script lang="ts" setup>
import 'echarts/extension/bmap/bmap'
import ContainerAdapt from '@/components/ContainerAdapt/index.vue'
import { ref } from 'vue'
import { EChartsOption } from 'echarts'
import linesData from './linesData.json'

const testPoint = [
  {
    name: '海门',
    value: [121.15, 31.89, 80]
  },
  {
    name: '南京',
    value: [118.78, 32.04, 100]
  },
  {
    name: '北京',
    value: [116.408213, 39.925091, 200]
  },
  {
    name: '上海',
    value: [121.47939, 31.229506, 180]
  },
  // {
  //   name: '广州',
  //   value: [113.26568,23.143312, 220]
  // },
  {
    name: '深圳',
    value: [114.082374, 22.546854, 300]
  }
]
const option = ref<EChartsOption>({
  bmap: {
    key: 'bm6oYC9dvheWQRfCxO54ZnjyKtOhrg2o',
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true, // 是否可交互
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#f3f3f3'
          }
        },
        {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'highway',
          elementType: 'all',
          stylers: {
            color: '#fdfdfd'
          }
        },
        {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'all',
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'label',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#999999'
          }
        }
      ]
    }
  },
  series: [
    // @ts-ignore
    {
      type: 'lines',
      coordinateSystem: 'bmap',
      data: linesData,
      effect: {
        show: true,
        period: 4,
        symbol: 'arrow',
        symbolSize: 3,
        trailLength: 0.02
      },
      lineStyle: { color: '#1DE9B6', width: 0.1, opacity: 0.5, curveness: 0.3 },
      zLevel: 2
    }
  ]
})
</script>

<style scoped></style>
