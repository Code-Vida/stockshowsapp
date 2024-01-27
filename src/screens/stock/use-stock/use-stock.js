import { useLazyQuery, useMutation } from '@apollo/client'
import { useState, useCallback, useEffect } from 'react'
import { GET_PRODUCT, CREATE_PRODUCT } from './graphql'
import { useForm } from 'react-hook-form'

const useStock = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [barCode, setBarCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const { control, formState, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange',
  })

  const [createProductMutation, { data: create }] = useMutation(CREATE_PRODUCT)

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
      createProductMutation({
        variables: {
          input,
        },
      })
        .then(async (res) => {
          if (res?.data?.createProduct?.id) {
            setMessage('Transação executada com sucesso.')
            setVisible(true)
            setBarCode(null)
            reset()
            setValue('id', '')
            setValue('model', '')
            setValue('color', '')
            setValue('amount', '')
            setValue('number', '')
            setValue('purchaseValue', '')
            setValue('value', '')
            setValue('purchaseDate', '')
            setValue('brand', '')
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
    [createProductMutation],
  )

  useEffect(() => {
    if (create) {
      reset()
    }
  }, [create])

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
    setValue,
    control,
    handleSubmit,
    formState,
    setBarCode,
  }
}

export default useStock

const normalizeValues = (data) => {
  return {
    id: data.id,
    barCode: data.barCode,
    brand: data.brand,
    color: data.color,
    model: data.model,
    number: parseInt(data.number),
    amount: parseInt(data.amount),
    purchaseDate: new Date(data.purchaseDate),
    purchaseValue: parseFloat(data.purchaseValue),
    value: parseFloat(data.value),
  }
}
