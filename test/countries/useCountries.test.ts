import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useCountries } from '../../src/app'

const TestComponent = {
  template: `
    <div id="test">{{ getCountries }}</div>
  `,
  setup() {
    const countries = ref([
      {id: 'KH', country: 'Cambodia', dial_code: '+855', region: 'SE-AS' },
      {id: 'LA', country: 'Laos', dial_code: '+856', region: 'SE-AS' },
      {id: 'MM', country: 'Myanmar', dial_code: '+95', region: 'SE-AS' },
      {id: 'TH', country: 'Thailand', dial_code: '+66', region: 'SE-AS' },
      {id: 'VN', country: 'Viet Nam', dial_code: '+84', region: 'SE-AS' },
      {id: 'BN', country: 'Brunei Darussalam', dial_code: '+673', region: 'SE-AS' },
      {id: 'TL', country: 'Timor-Leste', dial_code: '+670', region: 'SE-AS' },
      {id: 'ID', country: 'Indonesia', dial_code: '+62', region: 'SE-AS' },
      {id: 'MY', country: 'Malaysia', dial_code: '+60', region: 'SE-AS' },
      {id: 'PH', country: 'The Philippines', dial_code: '+63', region: 'SE-AS' },
      {id: 'SG', country: 'Singapore', dial_code: '+65', region: 'SE-AS' },
    ])
    const id = ref('ID')
    const region = ref('SE-AS')
    
    const { getCountries } = useCountries(countries, id, region)
    
    return {
      getCountries
    }
  }
}

test('Testing useCountries composable helper', () => {
  const wrapper = mount(TestComponent)
  
  const tested = wrapper.get('#test')
  expect(JSON.parse(tested.text())).toEqual([{ id: 'ID', country: 'Indonesia', dial_code: '+62', region: 'SE-AS' }])
})
