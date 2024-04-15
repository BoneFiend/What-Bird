export const getPredictions = (description: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ desc: description }),
  }

  return fetch('/desc', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log('Error: Could not reach What Bird servers')
      return {}
    })
}

export const getTestPredictions = () => {
  return fetch('/test')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log('Error: Could not reach What Bird servers')
      return {}
    })
}
