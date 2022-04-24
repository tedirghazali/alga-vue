import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useTable } from '../../src/app'

const TableComponent = {
  template: `
    <div id="properties">{{ properties }}</div>
    <div id="data">{{ data }}</div>
  `,
  setup() {
    
    const columns = ref([
      {prop: 'name', text: 'Text'},
      {prop: 'quantity', text: 'Quantity'},
      {prop: 'price', text: 'Price'}
    ])
    
    const rows = ref([
      { name: 'Entry-1', quantity: 3, price: 12 },
      { name: 'Entry-2', quantity: 5, price: 9.5 },
      { name: 'Entry-3', quantity: 3, price: 8.4 },
      { name: 'Entry-4', quantity: 7, price: 9.6 }
    ])
    
    const { getColumnProperties, getColumnData } = useTable(columns, rows)
    
    const data = getColumnData('price')
    
    return {
      properties: getColumnProperties,
      data
    }
  }
}

test('Testing useTable composable helper', () => {
  const wrapper = mount(TableComponent)
  
  const properties = wrapper.get('#properties')
  expect(JSON.parse(properties.text())).toEqual(["name", "quantity", "price"])
  
  const data = wrapper.get('#data')
  expect(JSON.parse(data.text())).toEqual([12, 9.5, 8.4, 9.6])
})
