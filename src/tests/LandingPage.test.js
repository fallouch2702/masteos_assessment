import { render, screen, fireEvent } from '@testing-library/react'
import LandingPage from '../components/LandingPage'


describe('Landing page', () => {
  test ('Should contains start button', () => {
    render(<LandingPage/>)
    const startButton = screen.getByText('Start the game')
    expect(startButton).not.toBeNull()
  })
  test('Should contains <you can\'t> image', () => {
    render(<LandingPage/>)
    const image = screen.getByAltText('you can\'t')
    expect(image).not.toBeNull()
  })
  test ('Next step on start button click', () => {
    const mockNextStep = jest.fn()
    render(<LandingPage nextStep={mockNextStep} />)
    const startButton = screen.getByText('Start the game')
    fireEvent.click(startButton)
    expect(mockNextStep).toHaveBeenCalledTimes(1)
  })
})
