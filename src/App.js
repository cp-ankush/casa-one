import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './form'
import { fetchData } from './network'
import {
  useAddressState,
  useProductItemState
} from './customHooks'

const fetchProductItems = ({setProductItems, setValidProducts}) => {
  fetchData({
    url: 'productItems'
  }).then((res) => {
    let productItemsState = {}
    let validRes = {}
    res.forEach((item, index) => {
      productItemsState[index] = item
      validRes[index] = item.name? true: false
    })
    setProductItems(productItemsState)
    setValidProducts(validRes)
  })
}

const fetchAddressData = ({url, setData}) => {
  fetchData({
    url
  }).then((res) => {
    res.date = new Date(JSON.parse(res.date))
    setData(res)
  })
}

const useDataEffect = ({setBillingData, setShippingData, setProductItems, setValidProducts}) => {
  useEffect(() => {
    fetchAddressData({url: 'billingAddress', setData: setBillingData})
    fetchAddressData({url: 'shippingAddress', setData: setShippingData})
    fetchProductItems({setProductItems, setValidProducts})
  }, [])
}

const setShipmentDate = ({
  billingDate,
  setShippingData,
  shippingData
}) => {
  if (billingDate > shippingData.date) {
    setShippingData({...shippingData, date: billingDate})
  }
}

function App() {
  const [billingData, setBillingData] = useAddressState()
  const [shippingData, setShippingData] = useAddressState()
  const [productItems, setProductItems] = useState({})

  const [isValidBilling, setValidBilling] = useState(true)
  const [isValidShipping, setValidShipping] = useState(true)
  const [isValidProducts, setValidProducts] = useState({})

  useDataEffect({setBillingData, setShippingData, setProductItems, setValidProducts})
  setShipmentDate({
    billingDate: billingData.date,
    setShippingData,
    shippingData
  })
  return (
    <div className="App">
      <Form
        billingData={billingData}
        shippingData={shippingData}
        productItems={productItems}
        setBillingData={setBillingData}
        setShippingData={setShippingData}
        setProductItems={setProductItems}
        fetchProductItems={fetchProductItems}
        isValidBilling={isValidBilling}
        setValidBilling={setValidBilling}
        isValidShipping={isValidShipping}
        setValidShipping={setValidShipping}
        isValidProducts={isValidProducts}
        setValidProducts={setValidProducts}
        fetchAddressData={fetchAddressData}
        />
    </div>
  );
}

export default App;
