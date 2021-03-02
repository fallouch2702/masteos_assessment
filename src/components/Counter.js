import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { computeDuration } from '../utils'

const Counter = ({ startDuration }) => {
  const [duration, setDuration] = useState(computeDuration(startDuration))
  useEffect(() => {
    const interval = setInterval(() => setDuration(computeDuration(startDuration)), 1000)
    return () => clearInterval(interval)
  }, [startDuration])



  return (
    <Typography variant="h2">{duration}</Typography>
  )
}

export default Counter