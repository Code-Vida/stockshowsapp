import { gql } from '@apollo/client'

export const GET_PRODUCT = gql`
  query GetProduct($input: ProductInput) {
    getProduct(input: $input) {
      nodes {
        barCode
        id
        brand
        model
        color
        number
        value
        purchaseValue
        purchaseDate
        amount
        sales
      }
    }
  }
`

export const DEVOLUTION_PRODUCT = gql`
  mutation DevolutionProduct($input: ID) {
    devolution(input: $input)
  }
`
