import { computed } from 'vue'
import { useCourierStore } from '@/store/useCourierStore'

export const useUser = () => {
  const courierStore = useCourierStore()

  const isLogin = computed(() => typeof courierStore.courier.id === 'string')
  const courier = computed(() => courierStore.courier)
  return { isLogin, courier }
}
