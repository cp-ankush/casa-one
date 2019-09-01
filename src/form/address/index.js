import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import {
  nonEmptyString,
  nonEmptyCharString,
  zipCodeValidator,
  onlyNumbers
} from '../validations'
import isEmpty from 'lodash/isEmpty'

import "react-datepicker/dist/react-datepicker.css";

import {
  FormContainer,
  Heading,
  AddressForm,
  Input,
  DateContainer,
  Error,
  InputContainer
} from './styles'

const validateForm = ({values, setValid}) => {
  let errors = {};
  if (!nonEmptyCharString.test(values.firstName)) {
    errors.firstName = 'First Name should not be empty and contain only a-z or A-Z characters without spaces.'
  }

  if (!nonEmptyCharString.test(values.lastName)) {
    errors.lastName = 'Last Name should not be empty and contain only a-z or A-Z characters without spaces.'
  }

  if (!nonEmptyString.test(values.line1)) {
    errors.line1 = 'Address should not be empty.'
  }

  if (!nonEmptyString.test(values.line2)) {
    errors.line2 = 'Address should not be empty.'
  }

  if (!nonEmptyString.test(values.city)) {
    errors.city = 'City should not be empty.'
  }

  if (!nonEmptyString.test(values.state)) {
    errors.state = 'State should not be empty.'
  }

  if (!zipCodeValidator.test(values.zipCode)) {
    errors.zipCode = 'Zip code should not be empty and contain only 6 numbers.'
  }

  if (!nonEmptyString.test(values.country)) {
    errors.country = 'Country should not be empty.'
  }
  setValid(isEmpty(errors))
  return errors
}

const renderAddressForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  dateHeading,
  setAddress,
  minDate
}) => {
  return (
    <FormContainer>
      <InputContainer>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, firstName: value})
          }}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <Error>{errors.firstName && touched.firstName && errors.firstName}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, lastName: value})
          }}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <Error>{errors.lastName && touched.lastName && errors.lastName}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="line1"
          placeholder="Address Line 1"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, line1: value})
          }}
          onBlur={handleBlur}
          value={values.line1}
        />
        <Error>{errors.line1 && touched.line1 && errors.line1}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="line2"
          placeholder="Address Line 2"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, line2: value})
          }}
          onBlur={handleBlur}
          value={values.line2}
        />
        <Error>{errors.line2 && touched.line2 && errors.line2}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="city"
          placeholder="City"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, city: value})
          }}
          onBlur={handleBlur}
          value={values.city}
        />
        <Error>{errors.city && touched.city && errors.city}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="state"
          placeholder="State"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, state: value})
          }}
          onBlur={handleBlur}
          value={values.state}
        />
        <Error>{errors.state && touched.state && errors.state}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="zipCode"
          placeholder="Zipcode"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, zipCode: value})
          }}
          onBlur={handleBlur}
          value={values.zipCode}
        />
        <Error>{errors.zipCode && touched.zipCode && errors.zipCode}</Error>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          name="country"
          placeholder="Country"
          onChange={(event) => {
            const { value } = event.target
            setAddress({...values, country: value})
          }}
          onBlur={handleBlur}
          value={values.country}
        />
        <Error>{errors.country && touched.country && errors.country}</Error>
      </InputContainer>
      <DateContainer>
        <Heading>{dateHeading}</Heading>
        <DatePicker
          selected={values.date}
          minDate={minDate}
          onChange={(date) => {
            setAddress({...values, date})
          }}
          />
      </DateContainer>
    </FormContainer>
  )
}

const Address = ({ type, heading, dateHeading, address, setAddress, setValid, minDate }) => {
  return (
    <AddressForm>
      <Heading>{heading}</Heading>
      <Formik
        validateOnBlur
        enableReinitialize
        initialValues={address}
        validate={values => {
          return validateForm({values, setValid})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          renderAddressForm({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            dateHeading,
            setAddress,
            minDate
          })
        )}
      </Formik>
    </AddressForm>
  )
}

export default Address
