import { ref, watch, computed, Ref } from 'vue'

export default function useDivisions(refEntries: Ref<any>, refCountry: Ref<string>, refId: Ref<string>) {
  const divisions = ref<any | any[]>([])
  
  const setDivisions = () => {
    divisions.value = refEntries.value
    
    if(refCountry.value !== '') {
      divisions.value = refEntries.value?.[refCountry.value] || []
      
      if(refId.value !== '') {
        divisions.value = divisions.value.filter((i: any) => String(i?.id).toLowerCase() === String(refId.value).toLowerCase())
      }
      
      divisions.value = divisions.value.sort((a: any, b: any) => String(a?.division).localeCompare(String(b?.division)))
    }
  }
  
  setDivisions()
  watch(refCountry, setDivisions)
  watch(refId, setDivisions)
  
  const getDivisions = computed<any | any[]>(() => {
    return divisions.value
  })
  
  return {
    setDivisions,
    getDivisions
  }
}
