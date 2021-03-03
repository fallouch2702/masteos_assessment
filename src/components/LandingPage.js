import { Grid, Button, makeStyles, Container } from '@material-ui/core'
import LandingPageImage from './images/youcant.png'

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
      fontSize: theme.typography.h3.fontSize,
      margin: theme.spacing(10)
    }
  },
  text: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    marginBottom: theme.spacing(5),
    '&.bold': {
      marginLeft: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold
    }
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
        <img src={LandingPageImage} alt="you can't"/>

        <Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            {/* MAIN PAGE TEXT */}
            <span varitant="h3" className={classes.text}>
              Five functions to fill. One ticking clock.
            </span>
            <span varitant="h3" className={classes.text + ' bold'}>
              How fast can you code?
            </span>
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
