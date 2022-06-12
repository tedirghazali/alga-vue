import { ref, computed, watch, Ref } from 'vue'

const idRef = ref('')

export default function useCountries(entries: Ref<any[]>, id: Ref<string> = idRef, prop: string = '') {
  const countries = ref<any[]>([])
  
  const setCountries = () => {
    countries.value = entries.value
    
    if(prop === 'region' && id.value !== '') {
      countries.value = entries.value.filter((i: any) => String(i?.region).toLowerCase() === String(id.value).toLowerCase())
    }
    
    if(prop === 'id' && id.value !== '') {
      countries.value = entries.value.filter((i: any) => String(i?.id).toLowerCase() === String(id.value).toLowerCase())
    }
  }
  
  setCountries()
  watch(id, setCountries)
  
  const getCountries = computed<any[]>(() => {
    return countries.value.sort((a: any, b: any) => String(a?.country).localeCompare(String(b?.country)))
  })
  
  return {
    setCountries,
    getCountries
  }
}
