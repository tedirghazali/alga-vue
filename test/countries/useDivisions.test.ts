import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useDivisions } from '../../src/app'

const TestComponent = {
  template: `
    <div id="test">{{ getDivisions }}</div>
  `,
  setup() {
    const divisions = ref({ID :[{"id":"AC","division":"Aceh","country":"ID"},{"id":"BB","division":"Kepulauan Bangka Belitung","country":"ID"},{"id":"BE","division":"Bengkulu","country":"ID"},{"id":"BT","division":"Banten","country":"ID"},{"id":"GO","division":"Gorontalo","country":"ID"},{"id":"JA","division":"Jambi","country":"ID"},{"id":"JB","division":"Jawa Barat","country":"ID"},{"id":"JI","division":"Jawa Timur","country":"ID"},{"id":"JK","division":"Daerah Khusus Ibukota Jakarta","country":"ID"},{"id":"JT","division":"Jawa Tengah","country":"ID"},{"id":"JW","division":"Jawa","country":"ID"},{"id":"KB","division":"Kalimantan Barat","country":"ID"},{"id":"KI","division":"Kalimantan Timur","country":"ID"},{"id":"KR","division":"Kepulauan Riau","country":"ID"},{"id":"KS","division":"Kalimantan Selatan","country":"ID"},{"id":"KT","division":"Kalimantan Tengah","country":"ID"},{"id":"LA","division":"Lampung","country":"ID"},{"id":"MA","division":"Maluku","country":"ID"},{"id":"ML","division":"Kepulauan Maluku","country":"ID"},{"id":"MU","division":"Maluku Utara","country":"ID"},{"id":"NB","division":"Nusa Tenggara Barat","country":"ID"},{"id":"NT","division":"Nusa Tenggara Timur","country":"ID"},{"id":"NU","division":"Kepulauan Nusa Tenggara","country":"ID"},{"id":"PA","division":"Papua","country":"ID"},{"id":"PB","division":"Papua Barat","country":"ID"},{"id":"PP","division":"Papua bagian barat","country":"ID"},{"id":"RI","division":"Riau","country":"ID"},{"id":"SA","division":"Sulawesi Utara","country":"ID"},{"id":"SB","division":"Sumatera Barat","country":"ID"},{"id":"SG","division":"Sulawesi Tenggara","country":"ID"},{"id":"SL","division":"Sulawesi","country":"ID"},{"id":"SM","division":"Sumatera","country":"ID"},{"id":"SN","division":"Sulawesi Selatan","country":"ID"},{"id":"SR","division":"Sulawesi Barat","country":"ID"},{"id":"SS","division":"Sumatera Selatan","country":"ID"},{"id":"ST","division":"Sulawesi Tengah","country":"ID"},{"id":"SU","division":"Sumatera Utara","country":"ID"},{"id":"YO","division":"Yogyakarta","country":"ID"},{"id":"KU","division":"Kalimantan Utara","country":"ID"},{"id":"BA","division":"Bali","country":"ID"},{"id":"KA","division":"Kalimantan","country":"ID"}]})
    const country = ref('ID')
    const id = ref('AC')
    
    const { getDivisions } = useDivisions(divisions, country, id)
    
    return {
      getDivisions
    }
  }
}

test('Testing useDivisions composable helper', () => {
  const wrapper = mount(TestComponent)
  
  const tested = wrapper.get('#test')
  expect(JSON.parse(tested.text())).toEqual([{ id: 'AC', division: 'Aceh', country: 'ID' }])
})
