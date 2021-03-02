import { Box } from "@material-ui/core"
import { useEffect, useState } from "react"
import AceEditor from 'react-ace'

const CodeEditor = ({ code, codeWork, onChange, testCode }) => {

  const [editorFocus, setEditorFocus] = useState(false)
  const [onTesting, setOnTesting] = useState(false)

  // Catch ctrl-enter shortcut when editor is focus
  useEffect(() => {
    if (editorFocus && !onTesting) {
      const cb = e => {
        if (e.key === 'Enter' && e.ctrlKey) {
          setOnTesting(true)
          testCode()
          setOnTesting(false)
        }
      }
      document.addEventListener('keyup', cb)
      return () => document.removeEventListener('keyup', cb)
    }
  }, [editorFocus, onTesting, testCode])


  return (
    <Box border={2}>
      <AceEditor
        mode="java"
        theme="github"
        width="100%"
        fontSize="28px"
        value={code}
        onChange={onChange}
        onFocus={() => setEditorFocus(true)}
        onBlur={() => setEditorFocus(false)}
        readOnly={codeWork}
        commands={[{
          name: 'run',
          bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
          exec: () => console.log(this),
          readOnly: true
        }]}
      />
    </Box>
  )
}

export default CodeEditor
