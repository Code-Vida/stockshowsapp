import { gql } from '@apollo/client'

export const SALES_REPORT = gql`
  query SalesReport($input: Date) {
    salesReport(input: $input) {
      nodes {
        _id
        salesDate
        salesAmount
        product {
          id
          brand
          model
          color
          number
          value
          amount
        }
      }
    }
  }
`
