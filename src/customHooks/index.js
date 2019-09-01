import {useState} from 'react'

export const useAddressState = () => {
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    date: new Date()
  })

  return [
    address,
    setAddress
  ]
}
