import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

`

export const Heading = styled.div`
  display: grid;
  grid-template-columns: 10% 20% 10% 10% 10% 17% 10%;
  justify-content: flex-start;
  align-items: center;
  column-gap: 2%;
  height: 30px;
  width: 100%;
  max-width: 85%;
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
`

export const ItemList = styled.div`

`

export const HeadingItem = styled.div`
  font-weight: bold;
  font-size: 12px;
`

export const ItemFormContainer = styled.div`
  width: 100%;
`

export const FormContainer = styled(Heading)`
  margin-top: 10px;
  height: 50px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.2);
  align-items: center;
  height: 100px;
`

export const Input = styled.input`
  min-height: 30px;
  border-radius: 3px;
  border: 1px solid rgba(190, 190, 190, 0.7);
  outline: none;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
  ${props => props.styles}
  ::placeholder {
    font-weight: 500;
  }
`

export const Button = styled.button`
  background-color: rgba(90, 133, 231);
  height: 20px;
  border: none;
  border-radius: 2px;
  color: white;
`

export const DeleteButton = styled(Button)`
  background-color: rgba(214, 87, 71);
  height: 30px;
`

export const SaveButton = styled(Button)`
  height: 25px;
  width: 60px;
  ${props => props.styles}
`

export const AddButtonContainer = styled.div`
  margin-top: 10px;
`

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 80%;
`

export const Error = styled.span`
  font-size: 9px;
  color: red;
  height: 0px;
`

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const TextArea =  styled.textarea`
  width: 90%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 3px;
  border: 1px solid rgba(190, 190, 190, 0.7);
  outline: none;
  padding: 10px;
  ::placeholder {
    font-weight: 500;
  }
`
