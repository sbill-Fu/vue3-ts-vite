<template>
  <v-chart style="height: 650px" :option="option" />
</template>

<script setup lang="ts">
import 'echarts/extension/bmap/bmap'
import { ref } from 'vue'
import { EChartsOption } from 'echarts'
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
    value: [116.408213,39.925091, 200]
  },
  {
    name: '上海',
    value: [121.47939,31.229506, 180]
  },
  // {
  //   name: '广州',
  //   value: [113.26568,23.143312, 220]
  // },
  {
    name: '深圳',
    value: [114.082374,22.546854, 300]
  }
]

const option = ref<EChartsOption>({
  bmap: {
    key: 'bm6oYC9dvheWQRfCxO54ZnjyKtOhrg2o',
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: false, // 是否可交互
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
    {
      name: '销售额',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: testPoint,
      encode: {
        value: 2
      },
      itemStyle: {
        color: 'purple'
      },
      symbolSize: (val) => {
        return val[2] / 10
      },
      label: {
        show: false,
        position: 'right',
        formatter: (v) => {
          // @ts-ignore
          return `${v.data.name} - ${v.data.value[2]}`
        }
      },
      emphasis: {
        label: {
          show: true
        }
      }
    }
  ]
})
</script>

<style scoped></style>
