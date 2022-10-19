import utils from '@/utils/utils'
import { ref, onMounted } from 'vue'

export function useVisit() {
  const data = ref<Array<number>>([])
  onMounted(() => {
    for (let i = 0; i < 7; i++) {
      data.value.push(utils.random(100))
    }
  })
  return data
}