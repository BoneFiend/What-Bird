export const fetchPredictions = (description: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ desc: description }),
  }

  return fetch('/pred', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log('Error: Could not reach What Bird servers')
      return { birds: [] }
    })
}

export const fetchTestPredictions = () => {
  return fetch('/test-pred')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log('Error: Could not reach What Bird servers')
      return { birds: [] }
    })
}

export const fetchTaxonomy = (name: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  }

  return fetch('/tax', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log(
        `Error: Could not get Taxonomic information for '${name}' from What Bird servers`
      )
      return {}
    })
}

export const fetchPhotos = async (name: string, sciname: string, n: number) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      sciname: sciname,
      n: n,
    }),
  }

  return fetch('/pics', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      // TODO create toasts on error
      console.log(
        `Error: Could not get photos of '${name}' from What Bird servers`
      )
      return {}
    })
}
