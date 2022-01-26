import { ref, reactive, computed } from 'vue'
import { date as dt, array as arr } from 'alga-js'

export default function useCalendar(getYearRef: any = null, getMonthRef: any = null, getDayRef: any = null, locale: any = {value: 'en-US'}, dayType: any = {value: 'short'}) {
  const setYearRef = ref<number>(0)
  const setMonthRef = ref<number>(0)
  const setDayRef = ref<number>(0)
  const setWeeks = ref<number>(0)
  const setEvents = ref<any[]>([])
  const options = reactive<any>({
    dateEvent: 'startdate'
  })
  
  setYearRef.value = (getYearRef !== null && getYearRef.value !== 0) ? getYearRef.value : Number(new Date().getFullYear())
  setMonthRef.value = (getMonthRef !== null && getMonthRef.value !== 0) ? getMonthRef.value : Number(new Date().getMonth()) + 1
  setDayRef.value = (getDayRef !== null && getDayRef.value !== 0) ? getDayRef.value : Number(new Date().getDate())
  
  const getDayNames = computed<string[]>(() => {
    return dt.days(locale.value, dayType.value)
  })
  
  const getWeeks = computed<number>(() => {
    return dt.week(setYearRef.value, setMonthRef.value, setDayRef.value)
  })
  
  setWeeks.value = getWeeks.value
  
  const getWeekDays = computed<string[]>(() => {
    return dt.weeks(setYearRef.value, setWeeks.value, 'YYYY-MM-DD')
  })
    
  const getPrevDays = computed<number[]>(() => {
    const getFirstDay = Number(new Date(setYearRef.value, Number(setMonthRef.value) - 1, 1).getDay())
    let restPrevDays = []
    if(getFirstDay > 0) {
      const getPrevDay = Number(dt.daysInMonth(setYearRef.value, Number(setMonthRef.value) - 1)) - (getFirstDay - 1)
      for(let i = getPrevDay; i <= Number(dt.daysInMonth(setYearRef.value, Number(setMonthRef.value) - 1)); i++) {
        restPrevDays.push(i)
      }
    }
      
    return restPrevDays
  })
    
  const getMonthDays = computed<number>(() => {
    return dt.daysInMonth(setYearRef.value, setMonthRef.value)
  })
    
  const getNextDays = computed<number[]>(() => {
    const getLastDay = Number(new Date(setYearRef.value, Number(setMonthRef.value) - 1, Number(dt.daysInMonth(setYearRef.value, setMonthRef.value))).getDay())
    let restNextDays = []
    if(getLastDay < 6) {
      const getNextDay = 6 - getLastDay
      for(let i = 1; i <= getNextDay; i++) {
        restNextDays.push(i)
      }
    }
      
    return restNextDays
  })
  
  const getCurrentDay: number = Number(new Date(setYearRef.value, Number(setMonthRef.value) - 1, setDayRef.value).getDay())
    
  const getBeforeDays = computed<number[]>(() => {
    let restBeforeDays = []
    if(getCurrentDay > 0) {
      const getBeforeDay = getCurrentDay + 1
      for(let i = 1; i < getBeforeDay; i++) {
        restBeforeDays.push(dt.subtractDate(new Date(setYearRef.value, Number(setMonthRef.value) - 1, setDayRef.value), i), 'YYYY-MM-DD')
      }
    }
      
    return restBeforeDays
  })
    
  const getAfterDays = computed<number[]>(() => {
    let restAfterDays = []
    if(getCurrentDay < 6) {
      const getAfterDay = 6 - getCurrentDay
      for(let i = 1; i <= getAfterDay; i++) {
        restAfterDays.push(dt.addDate(new Date(setYearRef.value, Number(setMonthRef.value) - 1, setDayRef.value), i), 'YYYY-MM-DD')
      }
    }
      
    return restAfterDays
  })
  
  const getEvents = computed<any>(() => {
    if(setEvents.value.length >= 1) {
      return arr.group(setEvents.value, (item: any) => {
        if(options['dateEvent'] in item) {
          return new Date(item[options['dateEvent']]).getDate()
        }
      })
    } else {
      return []
    }
  })
  
  const getEventsByTime = computed<any>(() => {
    if(setEvents.value.length >= 1) {
      return arr.group(setEvents.value, (item: any) => {
        if(options['dateEvent'] in item) {
          return new Date(item[options['dateEvent']]).getHours()
        }
      })
    } else {
      return []
    }
  })
  
  return {
    setYearRef,
    setMonthRef,
    setDayRef,
    setWeeks,
    getWeeks,
    getWeekDays,
    getDayNames,
    getPrevDays,
    getMonthDays,
    getNextDays,
    getBeforeDays,
    getAfterDays,
    setEvents,
    getEvents,
    getEventsByTime
  }
}
