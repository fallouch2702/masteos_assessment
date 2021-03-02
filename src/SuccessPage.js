import { Button, Grid, makeStyles, Typography } from "@material-ui/core"

import youCan from './youcan.png'

const useStyle = makeStyles(theme => ({
  text: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 2, 1, 0),
    height: theme.spacing(15),
    width: theme.spacing(50),
    fontSize: theme.typography.h5.fontSize
  }
}))

const formatDuration = duration => {
  return `${Math.floor(duration /  60)} minutes, ${Math.floor(duration % 60)} seconds`
}

const SuccessPage = ({ startDuration }) => {

const classes = useStyle()

  return (
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        wrap="nowrap"
      >

        <img src={youCan} alt="you can" className={classes.media}/>

        <Typography variant="h3" className={classes.text}>{ formatDuration(startDuration) } for all 5 levels. Well done!</Typography>

          <Button variant="contained" className={classes.button + ' twitter'}>
            Tweet your victory
          </Button>
        
          <Button variant="contained" className={classes.button + ' facebook'}>
            Share on Facebook
          </Button>
      </Grid>
  )
}

export default SuccessPage