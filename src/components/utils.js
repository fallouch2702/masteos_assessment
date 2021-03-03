// Format time counter and success message time
export const computeDuration = duration => {
  const MINUTE = 60 // 1 MINUTES
  const formatNumber = n => n.toString().padStart(2, '0') // Number on two digit
  return `${(Math.floor(duration / MINUTE))}:${formatNumber(Math.floor(duration % 60))}`
}

// Format step starting code
export const formatCode = (functionName, variableName, commentText) => {
  commentText = ('//  ' + commentText).replace('\n', '\n//  ') + '\n' // format comment
  return (
    `function ${functionName}(${variableName}) {
${commentText}
    return ${variableName}
}`
  )
}

// add new status message function
export const addConsoleStatus = (...newStatus) => oldConsoleStatus => [...oldConsoleStatus, ...newStatus]

/*
**  CODE TEST UTILS
**    to test user code
*/

export const runCode = (code, setConsoleStatus) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('eval.worker.js') // create worker with custom worker

    const responseHandler = (message, resolved = false) => {
      // kill worker and timeout before resolving promise
      worker.terminate()
      clearTimeout(timeout)
      if (resolved) resolve(message)
      else reject(message)
    }

    // Timeout to avoid infinite loop or long executions
    const timeout = setTimeout(() => {
      responseHandler('TIMEOUT: Your code took too long to execute. There might be an infinite loop in there.')
    }, 1000)

    // catch worker message
    worker.onmessage = ({ data }) => {
      if (data.type === 'result') responseHandler(data.message, true) // user code result
      else if (data.type === 'error') responseHandler('ERROR: ' + data.message) // ERROR
      else if (data.type === 'consoleLog') setConsoleStatus(addConsoleStatus({ text: data.message.toString(), type: 'log' })) // console.log() || alert()
      else responseHandler('ERROR: AN ERROR OCCURED DURING TEST RUNNING') // unknown error
    }
    // catch worker error messages
    worker.onerror = (error) => {
      responseHandler(error.message)
    }
    // launch user code execution
    worker.postMessage(code)
  })
}

export const testCode = async (code, tests, functionName, setConsoleStatus) => {
  try {
    for (let i = 0; i < tests.length; i++) {
      const { input, output } = tests[i] // getting user code params to test and the expected result

      const functionCall = `${functionName}(${JSON.stringify(input)});` // format a call of the function in code user
      code = code + `;${functionCall}` // Adding function call with input param at the end of the user code

      const runningTestText = `Testing "${functionCall}"...` // message in console
      setConsoleStatus(addConsoleStatus({ text: runningTestText })) // adding message in console

      // run user code
      // if user code ran without problems or timeout promise will resolve
      // else promise will reject
      const result = await runCode(code, setConsoleStatus)

      // Compare user code result with the expected result
      if (result === output) { // user code result is equal with expected result
        const successText = `RIGHT: ${result} is the right answer.`
        setConsoleStatus(addConsoleStatus({ text: successText, type: 'success' }))
      } else { // if it's not equal
        const errorText = `WRONG: Got ${result} but expected ${output}. Try again!`
        setConsoleStatus(addConsoleStatus({ text: errorText, type: 'error' }))
        return false
      }
    }
  } catch (error) { // if an error occured during user code tests or a timeout
    setConsoleStatus(addConsoleStatus({ text: error, type: 'error' }))
    return false
  }
  return true
}
