import { mount } from '@vue/test-utils'
import { useCalculate } from '../../src/app'

const CalculateComponent = {
  template: `
    <div id="amounts">{{ getEntries }}</div>
    <div id="subtotal">{{ getSubTotal }}</div>
    <div id="rates">{{ getRates }}</div>
    <div id="total">{{ getTotal }}</div>
  `,
  setup() {
    const { setEntries, setRates, getEntries, getSubTotal, getRates, getTotal } = useCalculate('quantity', 'price', 'amount')
    
    setEntries.value = [
      { name: 'Entry-1', quantity: 3, price: 12, amount: 0 },
      { name: 'Entry-2', quantity: 5, price: 9.5, amount: 0 },
      { name: 'Entry-3', quantity: 3, price: 8.4 },
      { name: 'Entry-4', quantity: 7, price: 9.6 }
    ]
    
    setRates.value = [
      {name: 'tax', text: 'Sales Tax', amount: 10, type: 'percent', calc: 'addition'}
    ]
    
    return {
      getEntries,
      getSubTotal,
      getRates,
      getTotal
    }
  }
}

test('Testing useCalculate composable helper', () => {
  const wrapper = mount(CalculateComponent)
  
  const amounts = wrapper.get('#amounts')
  expect(JSON.parse(amounts.text())).toEqual([
    { name: 'Entry-1', quantity: 3, price: 12, amount: 36 },
    { name: 'Entry-2', quantity: 5, price: 9.5, amount: 47.5 },
    { name: 'Entry-3', quantity: 3, price: 8.4, amount: 25.2 },
    { name: 'Entry-4', quantity: 7, price: 9.6, amount: 67.2 }
  ])
  
  const subtotal = wrapper.get('#subtotal')
  expect(JSON.parse(subtotal.text())).toBe(175.9)
  
  const rates = wrapper.get('#rates')
  expect(JSON.parse(rates.text())).toEqual([
    { name: 'tax', text: 'Sales Tax', amount: 17.59, type: 'number', calc: 'addition' }
  ])
  
  const total = wrapper.get('#total')
  expect(JSON.parse(total.text())).toBe(193.49)
})
