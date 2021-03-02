import { Box, Button, Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core"
import { useEffect, useState, useRef } from "react";
import AceEditor from 'react-ace'
import Counter from './Counter'

// utils functions
import { computeDuration, formatCode, addConsoleStatus, testCode } from './utils'

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
  },
  statusCard: {
    height: theme.spacing(20),
    overflowY: 'scroll'
  },
  statusCardContent: {
    padding: 0
  },
  status: {
    fontSize: theme.typography.body1.fontSize,
    fontFamily: '\'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace', 
    whiteSpace: 'pre',
    padding: theme.spacing(1),
    '&.success': {
      backgroundColor: theme.palette.success.light
    },
    '&.error': {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.background.paper
    },
    '&.log': {
      background: theme.palette.text.disabled
    },
    '&.done': {
      background: theme.palette.warning.dark,
      color: theme.palette.background.paper
    }
  }
}))

const Challenge = ({ nextStep, functionName, variableName, commentText, consoleText, successText, tests, startDuration }) => {

  //  STATE
  const [code, setCode] = useState(formatCode(functionName, variableName, commentText))
  const [consoleStatus, setConsoleStatus] = useState([{ text: consoleText, type: 'success' }])
  const [codeWork, setCodeWork] = useState(false)

  //  Console REF
  const consoleRef = useRef()

  // Scroll console to bottom on new message
  useEffect(() => {
    consoleRef.current.scrollTop = consoleRef.current.scrollHeight
  }, [consoleStatus, consoleRef])

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
      <Box border={2}>
        {/* CODE EDITOR */}
        <AceEditor
          className={classes.editor}
          mode="java"
          theme="github"
          value={code}
          onChange={v => setCode(v)}
          width="100%"
          fontSize="28px"
          readOnly={codeWork}
        />
      </Box>
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
          <Card className={classes.statusCard} ref={consoleRef}>
            <CardContent className={classes.statusCardContent}>
              {
                //  Map console messages
                consoleStatus.map((status, i) => {
                  return <Typography key={i} className={`${classes.status} ${status.type}`}>{status.text}</Typography>
                })
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Challenge