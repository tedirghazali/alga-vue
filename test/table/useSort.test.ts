import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useSort } from '../../src/app'

const SortComponent = {
  template: `
    <div id="sorted">{{ sortedEntries }}</div>
  `,
  setup() {
    const rows = ref([
      { name: 'Entry-1', quantity: 3, price: 12 },
      { name: 'Entry-2', quantity: 5, price: 9.5 },
      { name: 'Entry-3', quantity: 3, price: 8.4 },
      { name: 'Entry-4', quantity: 7, price: 9.6 },
      { name: 'Entry-5', quantity: 2, price: 7 },
      { name: 'Entry-6', quantity: 4, price: 9.1 },
      { name: 'Entry-7', quantity: 1, price: 8.6 }
    ])
    
    const sorting = ref({
      col: 'quantity',
      by: 'asc'
    })
    
    const { sortedEntries } = useSort(rows, sorting)
    
    return {
      sortedEntries
    }
  }
}

test('Testing useSort composable helper', () => {
  const wrapper = mount(SortComponent)
  
  const sorted = wrapper.get('#sorted')
  expect(JSON.parse(sorted.text())).toEqual([
    {name: 'Entry-7', quantity: 1, price: 8.6},
    {name: 'Entry-5', quantity: 2, price: 7},
    {name: 'Entry-1', quantity: 3, price: 12},
    {name: 'Entry-3', quantity: 3, price: 8.4},
    {name: 'Entry-6', quantity: 4, price: 9.1},
    {name: 'Entry-2', quantity: 5, price: 9.5},
    {name: 'Entry-4', quantity: 7, price: 9.6}
  ])
})
