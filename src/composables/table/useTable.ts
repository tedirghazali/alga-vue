import { ref, computed } from 'vue'
import { array as arr, object as obj } from 'alga-js'

export default function useTable(getEntries: any = null, filter: any = {}) {
  const setCurrentPage = ref<number>(1)
  const setTotalPages = ref<number>(1)
  const setLimitPerPage = ref<number>(10)
  const setEllipsis = ref<number>(2)
  const setSearch = ref<string>('')
  
  const getPaginatedEntries = computed<any[]>(() => {
    let newEntries = getEntries.value
    newEntries = setSearch.length >= 1 ? arr.search(newEntries, setSearch.value) : newEntries
    newEntries = obj.isObjectValues(filter) ? arr.filter(newEntries, filter) : newEntries
    setTotalPages.value = arr.pages(newEntries, setLimitPerPage.value)
    return arr.paginate(newEntries, setCurrentPage.value, setLimitPerPage.value)
  })
  
  const getPagination = computed<any[]>(() => {
    return arr.pagination(setTotalPages.value, setCurrentPage.value, setEllipsis.value)
  })
  
  return {
    setCurrentPage,
    setTotalPages,
    setLimitPerPage,
    setEllipsis,
    getPaginatedEntries,
    getPagination
  }
}
