import { act, fireEvent, render, screen } from '@testing-library/react'
import CodeEditor from '../components/CodeEditor'

describe('Code Editor', () => {
  it('Should contains code editor', () => {
    render(<CodeEditor/>)
    const editor = screen.getByTestId('code-editor')
    expect(editor).not.toBeNull()
  })

  it('Should execute callback on ctrl-enter keypress when editor focused', () => {
    const testCodeMock = jest.fn()
    render(<CodeEditor testCode={testCodeMock}/>)
    const editor = screen.getByTestId('code-editor')
    act(() => editor.querySelector('textarea').focus())
    fireEvent.keyUp(editor, { ctrlKey: true, key: 'Enter' })
    expect(testCodeMock).toBeCalledTimes(1)
  })
})