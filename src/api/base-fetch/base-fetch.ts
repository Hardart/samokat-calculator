import { ofetch, type FetchOptions } from 'ofetch'
import { ref } from 'vue'
import defu from 'defu'
import type { CustomResponse } from '@/shared/types/ResponseAPI'
import { useToast, type ToastServiceMethods } from 'primevue'

export const useHdFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>,
  toastItem?: ToastServiceMethods
) => {
  const data = ref<T>()
  const error = ref()

  const defaultOptions: FetchOptions<'json'> = {
    baseURL: '/api',
    method: 'GET',
  }

  const fetchOptions = defu(options, defaultOptions)

  try {
    const response = await ofetch<CustomResponse<T>>(url, fetchOptions)

    if (response.status == 'success') data.value = response.data
    if (response.status == 'error') error.value = response.message
    if (toastItem) {
      const toast = useToast()
      toast.add({ severity: 'success', ...toastItem })
    }
  } catch (err) {
    error.value = err
  }

  return { data, error }
}
