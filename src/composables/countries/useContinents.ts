import { ref, computed, watch, Ref } from 'vue'

const idRef = ref('')

export default function useContinents(entries: Ref<any[]>, id: Ref<string> = idRef) {
  const continents = ref<any[]>([])
  
  const setContinents = () => {
    continents.value = entries.value
    
    if(id.value !== '') {
      continents.value = entries.value.filter((i: any) => String(i?.id).toLowerCase() === String(id.value).toLowerCase())
    }
  }
  
  setContinents()
  watch(id, setContinents)
  
  const getContinents = computed<any[]>(() => {
    return continents.value.sort((a: any, b: any) => String(a?.continent).localeCompare(String(b?.continent)))
  })
  
  return {
    setContinents,
    getContinents
  }
}
