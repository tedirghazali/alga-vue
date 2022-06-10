import { ref, watch, computed, Ref } from 'vue'

export default function useCountries(refEntries: Ref<any[]>, refId: Ref<string>, refRegion: Ref<string>) {
  const countries = ref<any[]>([])
  
  const setCountries = () => {
    countries.value = refEntries.value
    
    if(refRegion.value !== '') {
      countries.value = refEntries.value.filter((i: any) => String(i?.region).toLowerCase() === String(refRegion.value).toLowerCase())
    }
    
    if(refId.value !== '') {
      countries.value = refEntries.value.filter((i: any) => String(i?.id).toLowerCase() === String(refId.value).toLowerCase())
    }
  }
  
  setCountries()
  watch(refId, setCountries)
  
  const getCountries = computed<any[]>(() => {
    return countries.value.sort((a: any, b: any) => String(a?.country).localeCompare(String(b?.country)))
  })
  
  return {
    setCountries,
    getCountries
  }
}
