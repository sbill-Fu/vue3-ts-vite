import utils from '@/utils/utils'
import { ref, onMounted } from 'vue'

const data = ref<Array<number>>([])
export function useVisit() {
  onMounted(() => {
    for (let i = 0; i < 7; i++) {
      data.value.push(utils.random(100))
    }
  })
  return data
}