import { Typography } from "@material-ui/core"
import { computeDuration } from './utils'

const Counter = ({ startDuration }) => {
  return (
    <Typography variant="h2">{computeDuration(startDuration)}</Typography>
  )
}

export default Counter