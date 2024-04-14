export const getBirdInfo = () => {
  return fetch('/get-bird-info')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log('Error: ', error)
    })
}
