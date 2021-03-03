import { render } from '@testing-library/react'
import Counter from '../components/Counter'

describe('Time counter', () => {
  it('Should print 00:10', () => {
    render(<Counter startDuration={10}/>)
    const durationEl = document.querySelector('h2')
    expect(durationEl.innerHTML).toBe('0:10')
  })
  it('Should print 10:35', () => {
    render(<Counter startDuration={635}/>)
    const durationEl = document.querySelector('h2')
    expect(durationEl.innerHTML).toBe('10:35')
  })
})
