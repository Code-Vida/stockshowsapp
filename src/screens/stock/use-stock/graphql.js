import { gql } from '@apollo/client'

export const GET_PRODUCT = gql`
  query GetProduct($input: ProductInput) {
    getProduct(input: $input) {
      nodes {
        id
        brand
        model
        color
        number
        value
        purchaseValue
        purchaseDate
        amount
      }
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
    }
  }
`
