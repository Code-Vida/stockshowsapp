import { useLazyQuery, useMutation } from '@apollo/client'
import { useState, useCallback } from 'react'
import { GET_PRODUCT, SALES_PRODUCT } from './graphql'
import { useForm } from 'react-hook-form'

const useSales = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [barCode, setBarCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const { control, formState, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange',
  })

  const [salesProductMutation] = useMutation(SALES_PRODUCT)

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

  const submit = useCallback(
    (data) => {
      const input = normalizeValues(data)
      salesProductMutation({
        variables: {
          input: input.id,
        },
      })
        .then((res) => {
          if (res?.data?.sales?.id) {
            setMessage('Transação executada com sucesso.')
            setVisible(true)
            reset()
          } else {
            setMessage('Erro ao executar a transação')
            setVisible(true)
          }
        })
        .catch((e) => {
          console.error(e.networkError.result)
          console.error(e)
          setMessage('Erro ao executar a transação')
          setVisible(true)
        })
    },
    [salesProductMutation],
  )

  const onDismissSnackBar = () => setVisible(false)
  return {
    loading,
    error,
    getProduct,
    showScanner,
    setShowScanner,
    barCode,
    product: data?.getProduct?.nodes,
    onDismissSnackBar,
    visible,
    submit,
    message,
    control,
    formState,
    handleSubmit,
    setValue,
  }
}

export default useSales

const normalizeValues = (data) => {
  return {
    id: data.id,
    barCode: data.barCode,
    brand: data.brand,
    color: data.color,
    model: data.model,
    number: parseInt(data.number),
    value: parseFloat(data.value),
  }
}
