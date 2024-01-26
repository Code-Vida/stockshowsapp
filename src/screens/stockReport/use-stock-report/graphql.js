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
