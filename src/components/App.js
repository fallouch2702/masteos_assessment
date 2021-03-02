import { useEffect, useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import LandingPage from './LandingPage'
import Challenge from './Challenge'
import SuccessPage from './SuccessPage'

// challenge data
import data from '../data.json'

// Import css
import './styles/App.css'

const challenge = (step, datas, setStartDuration) => {
  const numberOfStep = data.length // challenge step number
  const stepInt = Math.floor(step) // to get the integer step number

  if (step < 1) { // if beginning => load start page
    return <LandingPage { ...datas }/>
  } else if (step <= numberOfStep) { // if challenge started
    if (datas.startDuration === null) setStartDuration(0) // set the challenge begin timestamp
    datas = { ...datas, ...data[stepInt - 1] } // => Load code editor Component with step's params
    return <Challenge {...datas}/>
  } else {
    return <SuccessPage {...datas}/> // if challenge finished
  }
}

// DEFINE STYLE
const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: theme.spacing(4),
    '&.inProgress': {
      backgroundSize: 'cover',
      background: 'url(https://web.archive.org/web/20160407233622im_/http://games.usvsth3m.com/javascript-under-pressure/fanfold.jpg) no-repeat'
    },
    '&.finished': {
      backgroundSize: 'cover',
      background: 'url(https://web.archive.org/web/20160310174717im_/http://games.usvsth3m.com/javascript-under-pressure/victorybg.gif) no-repeat'
    }
  }
}))

function App() {

  // STYLE
  const classes = useStyles()

  
  //  STATE
  const [step, setStep] = useState(0.5)
  const [startDuration, setStartDuration] = useState(null)

  //  to set background class
  const computeContainerClass = () => {
    const classe = step < data.length + 0.5 ? 'inProgress' : 'finished'

    return `${classes.root} ${classe}`
  }

  useEffect(() => {
    if (step % 1 === 0) {
      const interval = setInterval(() => {
        setStartDuration(startDuration + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [step, startDuration])

  // RENDER
  return (
    <Container className={computeContainerClass()} maxWidth={false}>
      {
        challenge(step, {
          nextStep: () => setStep(step + 0.5),
          startDuration
        }, setStartDuration)
      }
    </Container>
  )
}

export default App
