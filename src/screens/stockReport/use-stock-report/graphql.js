import { gql } from '@apollo/client'

export const GET_PRODUCT = gql`
  query GetProduct($input: ProductInput, $pagination: PaginationInput) {
    getProduct(input: $input, pagination: $pagination) {
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
        sales
      }
      pagination {
        total
        lastPage
        perPage
        page
      }
      total {
        totalSalesSum
        totalSum
      }
    }
  }
`
