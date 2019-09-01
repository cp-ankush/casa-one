import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty'
import {
  nonEmptyString,
  nonEmptyCharString,
  zipCodeValidator,
  onlyNumbers,
  decimalNumbers
} from '../validations'
import {
  deleteItem,
  fetchData
} from '../../network'

import {
  ItemFormContainer,
  FormContainer,
  Input,
  DeleteButton,
  Error,
  InputContainer,
  TextArea
} from './styles'

const validateForm = ({values, setValid, isValidProducts, itemKey, productItems}) => {
  let errors = {};
  let isDuplicateProductId = false
  Object.keys(productItems).forEach((key) => {
    const item = productItems[key]
    if (values.id !== item.id && values.productId !== "" && values.productId === item.productId) {

      isDuplicateProductId = true
    }
  })
  if (isDuplicateProductId) {
    errors.productId = 'ProductId should not be duplicate.'
  }

  if (!onlyNumbers.test(values.productId)) {
    errors.productId = 'ProductId should not be empty and contain only numbers'
  }

  if (!nonEmptyString.test(values.name)) {
    errors.name = 'Product Name should not be empty.'
  }

  if (!onlyNumbers.test(values.quantity)) {
    errors.quantity = 'quantity should not be empty and contain only numbers.'
  }

  if (!decimalNumbers.test(values.price)) {
    errors.price = 'Price should not be empty and can have 2 decimals.'
  }
  setValid({
    ...isValidProducts,
    [itemKey]: isEmpty(errors)
  })
  return errors
}

const renderItemForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  itemKey,
  setProductItems,
  productItems,
  id,
  fetchProductItems,
  setValid
}) => {
  return (
    <FormContainer>
      <InputContainer>
        <Input
          type="text"
          name="productId"
          placeholder="Product Id"
          onChange={(event) => {
            const {value} = event.target
            setProductItems({
              ...productItems,
              [itemKey]: {
                ...productItems[itemKey],
                productId: value
              }
            })
          }}
          onBlur={handleBlur}
          value={values.productId}
        />
      <Error>{errors.productId && touched.productId && errors.productId}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={(event) => {
            const {value} = event.target
            setProductItems({
              ...productItems,
              [itemKey]: {
                ...productItems[itemKey],
                name: value
              }
            })
          }}
          onBlur={handleBlur}
          value={values.name}
        />
        <Error>{errors.name && touched.name && errors.name}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="quantity"
          placeholder="Quantity"
          onChange={(event) => {
            const {value} = event.target
            setProductItems({
              ...productItems,
              [itemKey]: {
                ...productItems[itemKey],
                quantity: value
              }
            })
          }}
          onBlur={handleBlur}
          value={values.quantity}
        />
        <Error>{errors.quantity && touched.quantity && errors.quantity}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="price"
          placeholder="Unit Price"
          onChange={(event) => {
            const {value} = event.target
            setProductItems({
              ...productItems,
              [itemKey]: {
                ...productItems[itemKey],
                price: value
              }
            })
          }}
          onBlur={handleBlur}
          value={values.price}
        />
        <Error>{errors.price && touched.price && errors.price}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="totalPrice"
          placeholder="Total Price"
          onBlur={handleBlur}
          value={(isNaN(values.price) || isNaN(values.quantity)? '' : Number(values.price) * Number(values.quantity))}
          readOnly
          styles={{backgroundColor: 'rgba(200, 200, 200, 0.6)'}}
        />
      </InputContainer>
      <InputContainer>
        <TextArea
          rows="12"
          cols="12"
          name="notes"
          onChange={(event) => {
            const {value} = event.target
            setProductItems({
              ...productItems,
              [itemKey]: {
                ...productItems[itemKey],
                notes: value
              }
            })
          }}
          onBlur={handleBlur}
          value={values.notes}
          placeholder="Notes"
          />
      </InputContainer>
      <DeleteButton onClick={() => {
          deleteItem({url: `productItems/${id}`, setProductItems}).then((res) => {
            fetchProductItems({setProductItems, setValidProducts: setValid})
          })
        }}>DELETE</DeleteButton>
    </FormContainer>
  )
}

const ItemForm = ({ item, setProductItems, itemKey, productItems, fetchProductItems, setValid,  isValidProducts}) => {
  return (
    <ItemFormContainer>
      <Formik
        validateOnBlur
        enableReinitialize
        initialValues={item}
        validate={values => {
          return validateForm({values, setValid, isValidProducts, itemKey, productItems})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          renderItemForm({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            itemKey,
            setProductItems,
            productItems,
            id: item.id,
            fetchProductItems,
            setValid
          })
        )}
      </Formik>
    </ItemFormContainer>
  )
}

export default ItemForm
