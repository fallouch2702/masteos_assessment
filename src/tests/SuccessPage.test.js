import { render, screen } from '@testing-library/react'
import SuccessPage from '../components/SuccessPage'


describe('Success page', () => {
  test ('Should contains challenge duration', () => {
    render(<SuccessPage startDuration={150}/>)
    const successText = document.querySelector('h3')
    expect(successText).not.toBeNull()
    expect(successText.innerHTML).toContain('2 minutes, 30 seconds')
  })
  test('Should contains <you can> image', () => {
    render(<SuccessPage/>)
    const image = screen.getByAltText('you can')
    expect(image).not.toBeNull()
  })
})
