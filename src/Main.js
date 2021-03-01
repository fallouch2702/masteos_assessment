import { Grid, Typography, Button, makeStyles, Container } from '@material-ui/core'
import LandingPageImage from './youcant.png'

// DEFINE STYLE
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  button: {
    '&.MuiButton-contained': {
      height: theme.spacing(10),
      padding: theme.spacing(10)
    },
    '& .MuiButton-label': {
      fontSize: '34px',
      margin: theme.spacing(10)
    }
  },
  mainText: {
    fontSize: 34,
    fontWeight: 100
  },
  boldText: {
    fontSize: 34,
    fontWeight: 900
  }
}))

const MainPage = ({ nextStep }) => {

  // STYLE
  const classes = useStyles()

  // RENDER
  return (
    <Container>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="space-around"
        alignItems="center"
        wrap="nowrap"
      >
        {/* MAIN PAGE IMAGE */}
        <img src={LandingPageImage} alt="You can't"/>

        <Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            {/* MAIN PAGE TEXT */}
            <Typography className={classes.mainText}>
              Five functions to fill. One ticking clock.
            </Typography>
            <Typography className={classes.boldText}>
              How fast can you code?
            </Typography>
          </Grid>
          
          {/* START CHALLENGE BUTTON */}
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            fullWidth
            onClick={nextStep}
          >
            Start the game
          </Button>
        </Grid>

      </Grid>
    </Container>
  )
}

export default MainPage