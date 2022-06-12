import { ref, computed, watch, Ref } from 'vue'

const countryRef = ref('')
const idRef = ref('')

export default function useDivisions(entries: Ref<any>, country: Ref<string> = countryRef, id: Ref<string> = idRef) {
  const divisions = ref<any[]>([])
  
  const setDivisions = () => {
    if(country.value !== '') {
      divisions.value = entries.value?.[country.value] || []
      
      if(id.value !== '') {
        divisions.value = divisions.value.filter((i: any) => String(i?.id).toLowerCase() === String(id.value).toLowerCase())
      }
    }
  }
  
  setDivisions()
  watch(country, setDivisions)
  watch(id, setDivisions)
  
  const getDivisions = computed<any[]>(() => {
    return divisions.value.sort((a: any, b: any) => String(a?.division).localeCompare(String(b?.division)))
  })
  
  return {
    setDivisions,
    getDivisions
  }
}
