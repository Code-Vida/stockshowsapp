import { GET_PRODUCT } from './graphql'
import { useLazyQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const useStockReport = () => {
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  })
  const [showScanner, setShowScanner] = useState(false)
  const [barCode, setBarCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()

  const [getProductQuery, { loading, error, data }] = useLazyQuery(
    GET_PRODUCT,
    {
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        if (!data?.getProduct?.nodes) {
          setVisible(true)
          setMessage('Nenhum produto encontrado!')
        }
      },
    },
  )

  const getProduct = ({ data }) => {
    getProductQuery({
      variables: {
        input: {
          barCode: data,
        },
      },
    })
    setBarCode(data)
    setShowScanner(false)
  }

  const onDismissSnackBar = () => setVisible(false)

  return {
    setValue,
    control,
    handleSubmit,
    formState,
    getProduct,
    product: data?.getProduct?.nodes,
    loading,
    error,
    message,
    visible,
    onDismissSnackBar,
    showScanner,
    barCode,
    setShowScanner,
  }
}

export default useStockReport
