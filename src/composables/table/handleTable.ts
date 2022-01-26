import { ref, computed } from 'vue'

export default function handleTable(getEntries: any) {
  const setCheckedEntries = ref<any[]>([])
  
  const isChecked = (entry: any) => {
    return setCheckedEntries.value.includes(entry)
  }
  
  const isCheckedAll = computed<boolean>(() => {
    const allLength = getEntries.value.length
    const checkedLength = setCheckedEntries.value.length
    return (allLength === checkedLength) ? true : false
  })
  
  return {
    setCheckedEntries,
    isChecked,
    isCheckedAll
  }
}
