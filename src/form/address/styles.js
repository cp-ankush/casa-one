import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const AddressForm = styled.div`
  width: 30%;
  padding: 0 3%;
`

export const Heading = styled.span`
  font-weight: bold;
  font-size: 12px;
`

export const Input = styled.input`
  height: 30px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid rgba(190, 190, 190, 0.7);
  outline: none;
  margin-bottom: 2px;
  padding: 0 10px;
  ::placeholder {
    font-weight: 500;
  }
`

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    height: 30px;
    border-radius: 3px;
    border: 1px solid rgba(190, 190, 190, 0.7);
    outline: none;
    margin-top: 10px;
    padding: 0 10px;
  }
`

export const Error = styled.span`
  font-size: 9px;
  color: red;
`

export const InputContainer = styled.div`
  margin-bottom: 10px;
`
