import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useContinents } from '../../src/app'

const TestComponent = {
  template: `
    <div id="test">{{ getContinents }}</div>
  `,
  setup() {
    const continents = ref([
      {id: 'AF', continent: 'Africa'},
      {id: 'AS', continent: 'Asia'},
      {id: 'EU', continent: 'Europe'},
      {id: 'NA', continent: 'North America'},
      {id: 'SA', continent: 'South America'},
      {id: 'AN', continent: 'Antarctica'},
      {id: 'AU', continent: 'Australasia'}
    ])
    const id = ref('AS')
    
    const { getContinents } = useContinents(continents, id)
    
    return {
      getContinents
    }
  }
}

test('Testing useContinents composable helper', () => {
  const wrapper = mount(TestComponent)
  
  const tested = wrapper.get('#test')
  expect(JSON.parse(tested.text())).toEqual([{ id: 'AS', continent: 'Asia' }])
})
