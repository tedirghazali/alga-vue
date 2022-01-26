import { ref, computed } from 'vue'
import { date as dt, number as num } from 'alga-js'

export default function handleCalendar(getYearRef: any = null, getMonthRef: any = null, getDayRef: any = null, locale: any = {value: 'en-US'}, dayType: any = {value: 'short'}, monthType: any = {value: 'long'}) {
  const setYearRef = ref<number>(0)
  const setMonthRef = ref<number>(0)
  const setDayRef = ref<number>(0)
  const startYear = ref<number>(0)
  const endYear = ref<number>(0)
  const setCalendarType = ref<string>('')
  const setWeeks = ref<number>(0)
  
  setYearRef.value = (getYearRef !== null && getYearRef.value !== 0) ? getYearRef.value : Number(new Date().getFullYear())
  setMonthRef.value = (getMonthRef !== null && getMonthRef.value !== 0) ? getMonthRef.value : Number(new Date().getMonth()) + 1
  setDayRef.value = (getDayRef !== null && getDayRef.value !== 0) ? getDayRef.value : new Date().getDate()
  
  const getRangeYears = computed<number[]>(() => {
    const getStartYear = (startYear.value !== 0) ? startYear.value : 1980
    const getEndYear = (endYear.value !== 0) ? endYear.value : Number(new Date().getFullYear()) + 5
    return num.loop(getStartYear, getEndYear)
  })
  
  const getMonthNames = computed<string[]>(() => dt.months(locale.value, monthType.value))
  const getDayNames = computed<string[]>(() => dt.days(locale.value, dayType.value))
  const getWeeks = computed<number>(() => {
    return dt.week(setYearRef.value, setMonthRef.value, setDayRef.value)
  })
  setWeeks.value = getWeeks.value
  
  const getCalendarTitle = computed<string>(() => {
    let newTitle: string = ''
    if(setCalendarType.value === 'daily') {
      newTitle = `${getDayNames.value[new Date(setYearRef.value, Number(setMonthRef.value) - 1, setDayRef.value).getDay()]}, ${setDayRef.value} ${getMonthNames.value[new Date(setYearRef.value, Number(setMonthRef.value) - 1).getMonth()]} ${setYearRef.value}`
    } else if(setCalendarType.value === 'weekly') {
      newTitle = `Week ${setWeeks.value}`
    } else if(setCalendarType.value === 'yearly') {
      newTitle = `${setYearRef.value}`
    } else {
      newTitle = `${getMonthNames.value[new Date(setYearRef.value, Number(setMonthRef.value) - 1).getMonth()]} ${setYearRef.value}`
    }
    return newTitle
  })
  
  const handleMonth = (getControlArg: string) => {
    if(getControlArg === 'prev') {
      if(setMonthRef.value > 1 && setMonthRef.value <= 12) {
        setMonthRef.value = setMonthRef.value - 1
      } else if(setMonthRef.value === 1) {
        setMonthRef.value = 12
        setYearRef.value = setYearRef.value - 1
      }
    } else if(getControlArg === 'next') {
      if(setMonthRef.value >= 1 && setMonthRef.value < 12) {
        setMonthRef.value = setMonthRef.value + 1
      } else if(setMonthRef.value === 12) {
        setMonthRef.value = 1
        setYearRef.value = setYearRef.value + 1
      }
    } else {
      setMonthRef.value = Number(new Date().getMonth()) + 1
      setYearRef.value = new Date().getFullYear()
    }
  }
  
  const handleYear = (getControlArg: string) => {
    if(getControlArg === 'prev') {
      setYearRef.value = setYearRef.value - 1
    } else if(getControlArg === 'next') {
      setYearRef.value = setYearRef.value + 1
    } else {
      setYearRef.value = new Date().getFullYear()
    }
  }
  
  const handleWeek = (getControlArg: string) => {
    if(getControlArg === 'prev') {
      if(setWeeks.value !== 1) {
        setWeeks.value = setWeeks.value - 1
      } else {
        setWeeks.value = 52
      }
    } else if(getControlArg === 'next') {
      if(setWeeks.value !== 52) {
        setWeeks.value = setWeeks.value + 1
      } else {
        setWeeks.value = 1
      }
    } else {
      setWeeks.value = getWeeks.value
    }
  }
  
  const handleDay = (getControlArg: string) => {
    if(getControlArg === 'prev') {
      if(setDayRef.value !== 1) {
        setDayRef.value = setDayRef.value - 1
      } else {
        setDayRef.value = Number(dt.daysInMonth(setYearRef.value, Number(setMonthRef.value) - 1))
        if(setMonthRef.value > 1 && setMonthRef.value <= 12) {
          setMonthRef.value = setMonthRef.value - 1
        } else if(setMonthRef.value === 1) {
          setMonthRef.value = 12
          setYearRef.value = setYearRef.value - 1
        }
      }
    } else if(getControlArg === 'next') {
      if(setDayRef.value !== Number(dt.daysInMonth(setYearRef.value, setMonthRef.value))) {
        setDayRef.value = setDayRef.value + 1
      } else {
        setDayRef.value = 1
        if(setMonthRef.value >= 1 && setMonthRef.value < 12) {
          setMonthRef.value = setMonthRef.value + 1
        } else if(setMonthRef.value === 12) {
          setMonthRef.value = 1
          setYearRef.value = setYearRef.value + 1
        }
      }
    } else {
      setMonthRef.value = Number(new Date().getMonth()) + 1
      setYearRef.value = new Date().getFullYear()
      setDayRef.value = new Date().getDate()
    }
  }
  
  return {
    setYearRef,
    setMonthRef,
    setDayRef,
    setWeeks,
    setCalendarType,
    startYear,
    endYear,
    getRangeYears,
    getMonthNames,
    getDayNames,
    getWeeks,
    getCalendarTitle,
    handleYear,
    handleMonth,
    handleWeek,
    handleDay
  }
}
