import { mount } from '@vue/test-utils'
import useCalendar from '../../src/composables/calendar/useCalendar'

const CalendarComponent = {
  template: `
    <div id="daynames">{{ getDayNames }}</div>
  `,
  setup() {
    const { setYearRef, setWeeks, getDayNames } = useCalendar()
    
    setYearRef.value = 2021
    setWeeks.value = 24
    
    return {
      getDayNames
    }
  }
}

test('Testing useCalendar composable helper', () => {
  const wrapper = mount(CalendarComponent)
  
  const daynames = wrapper.get('#daynames')
  expect(JSON.parse(daynames.text())).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
})
