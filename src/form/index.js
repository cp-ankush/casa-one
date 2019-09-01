import React from 'react'
import PropTypes from 'prop-types'
import Address from './address'
import ProductDetails from './product-details'

import {
  AddressSection,
  ProductDetailsSection
} from './styles'


// const useAddressEffect = ({setData, data}) => {
//   useEffect(() => {
//     setData({
//       firstName,
//       lastName,
//       line1,
//       line2,
//       city,
//       state,
//       zipCode,
//       country,
//       date: date? new Date(date) : ""
//     })
//   }, [data])
// }

const Form = ({
  billingData,
  shippingData,
  productItems,
  setShippingData,
  setProductItems,
  setBillingData,
  fetchProductItems,
  isValidBilling,
  setValidBilling,
  isValidShipping,
  setValidShipping,
  isValidProducts,
  setValidProducts,
  fetchAddressData
}) => {
  return (
    <>
      <AddressSection>
        <Address
          type={"billing_address"}
          heading={"Billing Address"}
          dateHeading={"Order Date"}
          minDate={new Date()}
          address={billingData}
          setAddress={setBillingData}
          setValid={setValidBilling}
          />
        <Address
          type={"shipping_address"}
          heading={"Shipping Address"}
          dateHeading="Expected Delivery"
          minDate={billingData.date}
          address={shippingData}
          setAddress={setShippingData}
          setValid={setValidShipping}
          />
      </AddressSection>
      <ProductDetailsSection>
        <ProductDetails
          productItems={productItems}
          billingData={billingData}
          shippingData={shippingData}
          setProductItems={setProductItems}
          fetchProductItems={fetchProductItems}
          setValid={setValidProducts}
          isValidProducts={isValidProducts}
          isValidShipping={isValidShipping}
          isValidBilling={isValidBilling}
          fetchAddressData={fetchAddressData}
          setBillingData={setBillingData}
          setShippingData={setShippingData}
          />
      </ProductDetailsSection>
    </>
  )
}

export default Form
