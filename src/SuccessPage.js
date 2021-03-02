import { Button, Grid, makeStyles, Typography } from "@material-ui/core"

import youCan from './youcan.png'

const useStyle = makeStyles(theme => ({
  successPageBg: {
    backgroundImage: 'url(https://web.archive.org/web/20160310174717im_/http://games.usvsth3m.com/javascript-under-pressure/victorybg.gif)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  media: {
    width: '30%',
    marginBottom: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(4, 2, 2, 0),
    height: theme.spacing(10),
  }
}))

const formatDuration = duration => {
  return `${Math.floor(duration / (1000 * 60))} minutes, ${Math.floor((duration / 1000) % 60)} seconds`
}

const SuccessPage = ({ duration }) => {

const classes = useStyle()

  return (
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        wrap="nowrap"
      >

        <img src={youCan} alt="you can" className={classes.media}/>

        <Typography>{ formatDuration(duration) } for all 5 levels. Well done!</Typography>

        <Grid item xs={6}>
          <Button variant="contained" className={classes.button} fullWidth>
            Tweet your victory
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button variant="contained" className={classes.button} fullWidth>
            Share on Facebook
          </Button>
        </Grid>    
      </Grid>
  )
}

export default SuccessPage