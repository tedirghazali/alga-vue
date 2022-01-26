import { ref, computed } from 'vue'

export default function useCalculate(getQuantity: string = 'quantity', getPrice: string = 'price', getAmount: string = 'amount') {
  const setEntries = ref<any[]>([])
  const setRates = ref<any[]>([])
  
  const getEntries = computed<any[]>(() => {
    return setEntries.value.map((entry: any) => {
      entry[getAmount] = Number(entry[getQuantity]) * Number(entry[getPrice])
      return entry
    })
  })
  
  const getSubTotal = computed<number>(() => {
    return (setEntries.value.length >= 1) ? setEntries.value.map(entry => Number(entry[getQuantity]) * Number(entry[getPrice])).reduce((acc, val) => acc + val) : 0
  })
  
  const getRates = computed<any[]>(() => {
    return setRates.value.map((rate: any) => {
      if(rate.type === 'percent') {
        rate.result = (Number(rate[getAmount]) / 100) * Number(getSubTotal.value)
      } else {
        rate.result = rate[getAmount]
      }
      return rate
    })
  })
  
  const getTotal = computed<number>(() => {
    let setTotal = getSubTotal.value
    for(let rate of getRates.value) {
      setTotal = (rate.calc === 'subtraction') ? Number(setTotal) - Number(rate.result) : Number(setTotal) + Number(rate.result)
    }
    return setTotal
  })
  
  return {
    setEntries,
    setRates,
    getEntries,
    getSubTotal,
    getRates,
    getTotal
  }
}
