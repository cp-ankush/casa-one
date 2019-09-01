import React from 'react'
import PropTypes from 'prop-types'
import ItemForm from './item-form'
import isEmpty from 'lodash/isEmpty'
import {saveItem, saveData, saveProductItem} from '../../network'

import {
  Container,
  Heading,
  ItemList,
  HeadingItem,
  Button,
  AddButtonContainer,
  SaveButtonContainer,
  SaveButton
} from './styles'

const productHeadings = [
    'Product ID',
    'Product Name',
    'QTY',
    'Unit Price',
    'Total Price',
    'Notes',
    '-'
]

const renderHeading = ({item, index}) => (
  <HeadingItem key={index}>{item}</HeadingItem>
)

const renderItem = ({item, setProductItems, key, productItems, fetchProductItems, setValid, isValidProducts}) => {
  return (
    <ItemForm
      item={item}
      key={item.id}
      itemKey={key}
      setProductItems={setProductItems}
      productItems={productItems}
      fetchProductItems={fetchProductItems}
      setValid={setValid}
      isValidProducts={isValidProducts}
      />
  )
}

const handleSaveData = ({
  productItems,
  billingData,
  shippingData,
  fetchAddressData,
  setBillingData,
  setShippingData,
  fetchProductItems,
  setProductItems,
  setValidProducts
}) => {
  billingData = {...billingData, date: JSON.stringify(billingData.date)}
  shippingData = {...shippingData, date: JSON.stringify(shippingData.date)}
  Object.keys(productItems).forEach((key) => {
    const id = productItems[key].id
    // JSON server support only to update object, have to update item one by one
    saveProductItem({url: `productItems/${id}`, body: productItems[key]}).then(() => {
      fetchProductItems({setProductItems, setValidProducts})
    })
  })

  saveItem({url: 'billingAddress', body: billingData}).then(() => {
    fetchAddressData({url: 'billingAddress', setData: setBillingData})
  })
  saveItem({url: 'shippingAddress', body: shippingData}).then(() => {
    fetchAddressData({url: 'shippingAddress', setData: setShippingData})
  })
}

const handleValidityToSave = ({
  isValidProducts,
  isValidShipping,
  isValidBilling
}) => {
  if (!isValidProducts || isEmpty(isValidProducts)) {
    return false
  }
  let validProducts = true
  Object.keys(isValidProducts).forEach((key) => {
    validProducts = validProducts && isValidProducts[key]
  })
  return validProducts && isValidShipping && isValidBilling
}

const ProductDetails = ({
  productItems,
  billingData,
  shippingData,
  setProductItems,
  fetchProductItems,
  setValid,
  isValidProducts,
  isValidShipping,
  isValidBilling,
  fetchAddressData,
  setBillingData,
  setShippingData
}) => {
  const isValid = handleValidityToSave({
    isValidProducts,
    isValidShipping,
    isValidBilling
  })
  return (
    <Container>
      <Heading>
      {
        productHeadings.map((item, index) => {
          return (renderHeading({item, index}))
        })
      }
      </Heading>
      <ItemList>
      {
        Object.keys(productItems).map((key) => {
          return renderItem({
            item: productItems[key],
            setProductItems, key,
            productItems,
            fetchProductItems,
            setValid,
            isValidProducts
          })
        })
      }
      </ItemList>
      <AddButtonContainer>
        <Button onClick={() => {
          saveItem({
            url: `productItems`,
            setData: setProductItems,
            body: {
              "id": "",
              "productId": "",
              "name": "",
              "quantity": "",
              "price": "",
              "notes": ""
            }
          }).then(() => {
            fetchProductItems({setProductItems, setValidProducts: setValid})
          })
          }}>ADD PRODUCT</Button>
      </AddButtonContainer>
      <SaveButtonContainer>
        <SaveButton
          styles={isValid? {opacity: 1} : {opacity: 0.4}}
          onClick={() => {
            isValid &&
            handleSaveData({
              productItems,
              billingData,
              shippingData,
              fetchProductItems,
              fetchAddressData,
              setProductItems,
              setValidProducts: setValid,
              setBillingData,
              setShippingData
            })
          }}
          >SAVE</SaveButton>
      </SaveButtonContainer>
    </Container>
  )
}

export default ProductDetails
