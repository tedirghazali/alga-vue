import { ref, watch, computed, Ref } from 'vue'

export default function useContinents(refEntries: Ref<any[]>, refId: Ref<string>) {
  const continents = ref<any[]>([])
  
  const setContinents = () => {
    continents.value = refEntries.value
    
    if(refId.value !== '') {
      continents.value = refEntries.value.filter((i: any) => String(i?.id).toLowerCase() === String(refId.value).toLowerCase())
    }
  }
  
  setContinents()
  watch(refId, setContinents)
  
  const getContinents = computed<any[]>(() => {
    return continents.value.sort((a: any, b: any) => String(a?.continent).localeCompare(String(b?.continent)))
  })
  
  return {
    setContinents,
    getContinents
  }
}
