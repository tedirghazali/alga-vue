import { ref, watch, computed, Ref } from 'vue'

export default function useRegions(refEntries: Ref<any[]>, refId: Ref<string>, refContinent: Ref<string>) {
  const regions = ref<any[]>([])
  
  const setRegions = () => {
    regions.value = refEntries.value
    
    if(refContinent.value !== '') {
      regions.value = refEntries.value.filter((i: any) => String(i?.continent).toLowerCase() === String(refContinent.value).toLowerCase())
    }
    
    if(refId.value !== '') {
      regions.value = refEntries.value.filter((i: any) => String(i?.id).toLowerCase() === String(refId.value).toLowerCase())
    }
  }
  
  setRegions()
  watch(refId, setRegions)
  
  const getRegions = computed<any[]>(() => {
    return regions.value.sort((a: any, b: any) => String(a?.region).localeCompare(String(b?.region)))
  })
  
  return {
    setRegions,
    getRegions
  }
}
