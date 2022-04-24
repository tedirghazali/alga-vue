import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useFilter } from '../../src/app'

const FilterComponent = {
  template: `
    <div id="searched">{{ searchedEntries }}</div>
    <div id="clean">{{ getCleanFilter }}</div>
    <div id="filtered">{{ filteredEntries }}</div>
  `,
  setup() {
    const rows = ref([
      { name: 'Tedir Ghazali', quantity: 3, price: 12 },
      { name: 'Alexander Samudra', quantity: 5, price: 9.5 },
      { name: 'Ghazali Samudra', quantity: 3, price: 8.4 },
      { name: 'Teuku Ghazali', quantity: 7, price: 9.6 },
      { name: 'Bukhari Usman', quantity: 2, price: 7 },
      { name: 'Zulkifli Usman', quantity: 4, price: 9.1 },
      { name: 'TM Ghazali', quantity: 3, price: 8.6 }
    ])
    
    const search = ref('ghazali')
    
    const filter = ref({
      name: '',
      quantity: 3,
      price: 0
    })
    
    const { searchedEntries, getCleanFilter, filteredEntries } = useFilter(rows, search, filter)
    
    return {
      searchedEntries,
      getCleanFilter,
      filteredEntries
    }
  }
}

test('Testing useFilter composable helper', () => {
  const wrapper = mount(FilterComponent)
  
  const searched = wrapper.get('#searched')
  expect(JSON.parse(searched.text())).toEqual([
    { name: 'Tedir Ghazali', quantity: 3, price: 12 },
    { name: 'Ghazali Samudra', quantity: 3, price: 8.4 },
    { name: 'Teuku Ghazali', quantity: 7, price: 9.6 },
    { name: 'TM Ghazali', quantity: 3, price: 8.6 }
  ])
  
  const clean = wrapper.get('#clean')
  expect(JSON.parse(clean.text())).toEqual({ quantity: 3 })
  
  const filtered = wrapper.get('#filtered')
  expect(JSON.parse(filtered.text())).toEqual([
    { name: 'Tedir Ghazali', quantity: 3, price: 12 },
    { name: 'Ghazali Samudra', quantity: 3, price: 8.4 },
    { name: 'TM Ghazali', quantity: 3, price: 8.6 }
  ])
})
