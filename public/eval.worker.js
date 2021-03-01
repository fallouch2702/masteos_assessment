/* eslint-disable no-restricted-globals */


onmessage = ({ data }) => {
  try {
    // eslint-disable-next-line
    const result = eval(data) // run code
    postMessage({ type: 'result', message: result }) // send result to the main thread
  } catch (error) {
    postMessage({ type: 'error', message: error.message }) // if error send an error to the main thread
  }
}

// replace console.log function with a function that will send params to the main thread to display them in the console
console.log = (...args) => {
  args = args.map(arg => {
    if ((typeof arg !== 'string') && (typeof arg !== 'number')) arg = JSON.stringify(arg) // stringify array and objects to display them correctly
    return arg
  })
  postMessage({ type: 'consoleLog', message: args }) // sending params to log to the main thread
}


// Replace alert() function with our custom console.log
// eslint-disable-next-line
const alert = data => {
  console.log(data)
}