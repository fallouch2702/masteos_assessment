import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { computeDuration } from './utils'

const Counter = ({ startTime }) => {
  const [duration, setDuration] = useState(computeDuration(startTime))
  useEffect(() => {
    const interval = setInterval(() => setDuration(computeDuration(startTime)), 1000)
    return () => clearInterval(interval)
  }, [startTime])



  return (
    <Typography variant="h2">{duration}</Typography>
  )
}

export default Counter