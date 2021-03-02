import { render, screen } from '@testing-library/react'
import Console from '../components/Console'

describe('Status console', () => {
  it('Should print a simple message', () => {
    const testText = 'TEEEEEEEEESSSSSTTTT'
    const status = [{ text: testText, type: 'success' }]
    render(<Console consoleStatus={status}/>)
    const statusLog = screen.getByText(testText)
    expect(statusLog).not.toBeNull()
    expect(statusLog.classList).toContain('success')
  })
  it('Should print 3 messages', () => {
    const status = [
      { text: 'success-1', type: 'success' },
      { text: 'log-2', type: 'log' },
      { text: 'error-3', type: 'error' }
    ]
    render(<Console consoleStatus={status}/>)
    status.forEach(el => {
      const statusLog = screen.getByText(el.text)
      expect(statusLog).not.toBeNull()
      expect(statusLog.classList).toContain(el.type)
    })
  })
})