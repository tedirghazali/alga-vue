import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { usePaginate } from '../../src/app'

const PaginationComponent = {
  template: `
    <div id="offset">{{ getOffset }}</div>
    <div id="pages">{{ getPages }}</div>
    <div id="paginated">{{ paginatedEntries }}</div>
    <div id="info">{{ getPageInfo }}</div>
    <div id="pagination">{{ getPagination }}</div>
  `,
  setup() {
    const rows = ref([
      { name: 'Tedir Ghazali', quantity: 3, price: 12 },
      { name: 'Alexander Samudra', quantity: 5, price: 9.5 },
      { name: 'Ghazali Samudra', quantity: 3, price: 8.4 },
      { name: 'Teuku Ghazali', quantity: 7, price: 9.6 },
      { name: 'Bukhari Usman', quantity: 2, price: 7 },
      { name: 'Zulkifli Usman', quantity: 4, price: 9.1 },
      { name: 'Teuku Usman', quantity: 3, price: 8.6 },
      { name: 'Boyhaki Usman', quantity: 4, price: 8.9 },
      { name: 'Bukhari Zulkifli', quantity: 4, price: 9.6 },
      { name: 'Boyhaki Zulkifli', quantity: 3, price: 7.6 },
      { name: 'Ghazali Zulkifli', quantity: 5, price: 8.6 },
      { name: 'Nurjannah', quantity: 7, price: 8.7 },
      { name: 'Murad', quantity: 8, price: 3.3 },
      { name: 'Annisa', quantity: 7, price: 7.5 },
      { name: 'Sunna', quantity: 3, price: 4.3 }
    ])
    
    const limitPerPage = ref(3)
    const currentPage = ref(3)
    const ellipsisPage = ref(2)
    
    const { getOffset, getPages, paginatedEntries, getPageInfo, getPagination, handleEllipsis } = usePaginate(rows, limitPerPage, currentPage, ellipsisPage)
    
    return {
      getOffset,
      getPages,
      paginatedEntries,
      getPageInfo,
      getPagination,
      handleEllipsis
    }
  }
}

test('Testing usePaginate composable helper', () => {
  const wrapper = mount(PaginationComponent)
  
  const offset = wrapper.get('#offset')
  expect(JSON.parse(offset.text())).toBe(7)
  
  const pages = wrapper.get('#pages')
  expect(JSON.parse(pages.text())).toBe(5)
  
  const paginated = wrapper.get('#paginated')
  expect(JSON.parse(paginated.text())).toEqual([
    { "name": "Teuku Usman", "quantity": 3, "price": 8.6 },
    { "name": "Boyhaki Usman", "quantity": 4, "price": 8.9 },
    { "name": "Bukhari Zulkifli", "quantity": 4, "price": 9.6 }
  ])
  
  const info = wrapper.get('#info')
  expect(JSON.parse(info.text())).toEqual({
    "start": 7,
    "end": 9,
    "length": 15
  })
  
  const pagination = wrapper.get('#pagination')
  expect(JSON.parse(pagination.text())).toEqual([ 1, 2, 3, 4, 5 ])
})
