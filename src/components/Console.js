import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import { useEffect, useRef } from 'react'

const useStyle = makeStyles(theme => ({
  statusCard: {
    height: theme.spacing(20),
    overflowY: 'scroll'
  },
  statusCardContent: {
    padding: 0,
    '&.MuiCardContent-root:last-child': {
      padding: 0
    }
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

const Console = ({ consoleStatus }) => {
  const classes = useStyle()

  //  Console REF
  const consoleRef = useRef()

  // Scroll console to bottom on new message
  useEffect(() => {
    const console = consoleRef.current
    console.scrollTop = console.scrollHeight
  }, [consoleStatus, consoleRef])

  return (
    <Card className={classes.statusCard} ref={consoleRef}>
      <CardContent className={classes.statusCardContent}>
        {
          //  Map console messages
          consoleStatus.map((status, i) =>
            <Typography key={i} className={`${classes.status} ${status.type}`}>{status.text}</Typography>
          )
        }
      </CardContent>
    </Card>
  )
}

export default Console
