import { computeDuration, addConsoleStatus } from '../components/utils'

describe('Compute duration', () => {
  it('Should return 0:00', () => {
    const computedDuration = computeDuration(0)
    expect(computedDuration).toEqual('0:00')
  })
  it('Should return 0:35', () => {
    const computedDuration = computeDuration(35)
    expect(computedDuration).toEqual('0:35')
  })
  it('Should return 2:08', () => {
    const computedDuration = computeDuration(128)
    expect(computedDuration).toEqual('2:08')
  })
})

describe('Add console status', () => {
  it('Should return [1]', () => {
    const statusArray = addConsoleStatus(1)([])
    expect(statusArray).toEqual([1])
  })
  it('Should return [1, 2, 3]', () => {
    const statusArray = addConsoleStatus(3)([1, 2])
    expect(statusArray).toEqual([1, 2, 3])
  })
  it('Should return [1, 2, 3, 4]', () => {
    const statusArray = addConsoleStatus(3, 4)([1, 2])
    expect(statusArray).toEqual([1, 2, 3, 4])
  })
})
