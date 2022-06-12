import { ref, computed, watch, Ref } from 'vue'

const idRef = ref('')

export default function useRegions(entries: Ref<any[]>, id: Ref<string> = idRef, prop: string = '') {
  const regions = ref<any[]>([])
  
  const setRegions = () => {
    regions.value = entries.value
    
    if(prop === 'continent' && id.value !== '') {
      regions.value = entries.value.filter((i: any) => String(i?.continent).toLowerCase() === String(id.value).toLowerCase())
    }
    
    if(prop === 'id' && id.value !== '') {
      regions.value = entries.value.filter((i: any) => String(i?.id).toLowerCase() === String(id.value).toLowerCase())
    }
  }
  
  setRegions()
  watch(id, setRegions)
  
  const getRegions = computed<any[]>(() => {
    return regions.value.sort((a: any, b: any) => String(a?.region).localeCompare(String(b?.region)))
  })
  
  return {
    setRegions,
    getRegions
  }
}
