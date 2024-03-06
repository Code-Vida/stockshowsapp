import { useLazyQuery, useMutation } from '@apollo/client'
import { useState, useCallback, useEffect } from 'react'
import { GET_PRODUCT, SALES_PRODUCT } from './graphql'
import { useForm } from 'react-hook-form'

const useSales = () => {
  const [showScanner, setShowScanner] = useState(false)
  const [barCode, setBarCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const [openBrandModal, setOpenBrandModal] = useState(false)
  const [openChooseProduct, setOpenChooseProduct] = useState(false)
  const [chooseProduct, setChoosenProduct] = useState()
  const { control, formState, handleSubmit, setValue, reset } = useForm({
    mode: 'onChange',
  })

  const [salesProductMutation, { data: sales }] = useMutation(SALES_PRODUCT)

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

  const submitSales = useCallback(
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
            setValue('id', '')
            setValue('model', '')
            setValue('color', '')
            setValue('number', '')
            setValue('value', '')
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
    [salesProductMutation],
  )

  const submit = useCallback((data) => {
    const input = normalizeInput(data)

    getProductQuery({
      variables: {
        input,
      },
    })
    setOpenBrandModal(false)
    setOpenChooseProduct(true)
  }, [])

  useEffect(() => {
    if (sales) {
      reset()
    }
  }, [sales])

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
    setBarCode,
    setOpenBrandModal,
    openBrandModal,
    submitSales,
    openChooseProduct,
    setChoosenProduct,
    chooseProduct,
    setOpenChooseProduct,
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

const normalizeInput = (data) => {
  for (const key in data) {
    if (typeof data[key] === 'string' && data[key].trim() === '') {
      delete data[key]
    }
  }
  return data
}
