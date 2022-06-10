import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useRegions } from '../../src/app'

const TestComponent = {
  template: `
    <div id="test">{{ getRegions }}</div>
  `,
  setup() {
    const regions = ref([
      {id: 'NA-AF', region: 'North Africa', continent: 'AF'},
      {id: 'SS-AF', region: 'Sub-Saharan Africa', continent: 'AF'},
      {id: 'ME-AS', region: 'Middle East', continent: 'AS'},
      {id: 'EA-AS', region: 'East Asia', continent: 'AS'},
      {id: 'CS-AS', region: 'Central and South Asia', continent: 'AS'},
      {id: 'SE-AS', region: 'Southeast Asia', continent: 'AS'},
      {id: 'WE-EU', region: 'Western Europe', continent: 'EU'},
      {id: 'EE-EU', region: 'Eastern Europe', continent: 'EU'},
      {id: 'NA-NA', region: 'North America', continent: 'NA'},
      {id: 'CC-NA', region: 'Central America and Caribbean', continent: 'NA'},
      {id: 'SA-SA', region: 'South America', continent: 'SA'},
      {id: 'OC-AU', region: 'Oceania', continent: 'AU'}
    ])
    const id = ref('SE-AS')
    const continent = ref('AS')
    
    const { getRegions } = useRegions(regions, id, continent)
    
    return {
      getRegions
    }
  }
}

test('Testing useRegions composable helper', () => {
  const wrapper = mount(TestComponent)
  
  const tested = wrapper.get('#test')
  expect(JSON.parse(tested.text())).toEqual([{ id: 'SE-AS', region: 'Southeast Asia', continent: 'AS' }])
})
