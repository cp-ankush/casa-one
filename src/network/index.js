const baseUrl = 'http://localhost:3001/'

export const fetchData = ({url}) => {
  return fetch(`${baseUrl}${url}`).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  }).catch((e) => {
    console.error("Error:", e)
  })
}

export const deleteItem = ({url, setProductItems}) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'delete',
  }).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  }).catch((e) => {
    console.error("Error:", e)
  })
}

export const saveItem = ({url, body}) => {
  return fetch(`${baseUrl}${url}`, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }).then((res) => {
            return res.json()
          }).then((res) => {
            return res
          }).catch((e) => {
            console.error("Error:", e)
          })
}

export const saveProductItem = ({url, body}) => {
  return fetch(`${baseUrl}${url}`, {
            method: 'put',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }).then((res) => {
            return res.json()
          }).then((res) => {
            return res
          }).catch((e) => {
            console.error("Error:", e)
          })
}
