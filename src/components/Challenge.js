import { useEffect, useState } from "react";


// Components
import CodeEditor from './CodeEditor'
import Console from './Console'
import Counter from './Counter'
import { Box, Button, Grid, makeStyles } from "@material-ui/core"

// utils functions
import { computeDuration, formatCode, addConsoleStatus, testCode } from '../utils'

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-github";

// DEFINE STYLE
const useStyles = makeStyles(theme => ({
  button: {
    height: theme.spacing(20),
    '& .MuiButton-label': {
      fontSize: theme.typography.h2.fontSize
    }
  },
  statusRoot: {
    marginTop: theme.spacing(1)
  }
}))

const Challenge = ({ nextStep, functionName, variableName, commentText, consoleText, successText, tests, startDuration }) => {

  //  STATE
  const [code, setCode] = useState(formatCode(functionName, variableName, commentText))
  const [consoleStatus, setConsoleStatus] = useState([{ text: consoleText, type: 'success' }])
  const [codeWork, setCodeWork] = useState(false)

  // Init code editor and first console message
  useEffect(() => {
    setCode(formatCode(functionName, variableName, commentText))
    setConsoleStatus([{ text: consoleText, type: 'success' }])
    setCodeWork(false)
  }, [functionName, variableName, commentText, consoleText])

  // On test button click
  const handleClick = async () => {
    if (!codeWork) { // if code hasn't been tested yet
      const itWorks = await testCode(code, tests, functionName, setConsoleStatus)
      if (itWorks) {
        setCodeWork(itWorks)

        const doneText = `SUCCESS! All tests passed. You've used ${computeDuration(startDuration)} so far. Well done!`
        // Print success messages in console
        setConsoleStatus(addConsoleStatus(
          { text: doneText, type: 'done' },
          { text: successText, type: 'done' }
        ))
        nextStep() // if code works step += 0,5, to stopping time counter
      }
    } else nextStep() // if code has been tested and works, go to next step
  }

  //style
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"  
    >
      <Grid
        container
        justify="flex-end"
      >
        {/* TIME COUNTER */}
        <Counter startDuration={startDuration}/>
      </Grid>
      {/* CODE EDITOR */}
      <CodeEditor
        code={code}
        codeWork={codeWork}
        onChange={v => setCode(v)}
        testCode={handleClick}
      />
      <Grid
        container
        className={classes.statusRoot}
        direction="row"
        spacing={3}
      >
        {/* TEST BUTTON */}
        <Grid item xs={4}>
          <Box border={1}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
                GO !
            </Button>
          </Box>
        </Grid>
        {/* CONSOLE */}
        <Grid item xs={8}>
          <Box border={1}>
            <Console
              consoleStatus={consoleStatus}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Challenge