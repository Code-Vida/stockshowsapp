import { GET_PRODUCT } from './graphql'
import { useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useState, useCallback, useEffect } from 'react'

const useStockReport = () => {
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  })
  const [showScanner, setShowScanner] = useState(false)
  const [barCode, setBarCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()
  const [filter, setFilter] = useState({})
  const [openBrandModal, setOpenBrandModal] = useState(false)

  const [page, setPage] = useState(0)
  const [numberOfItemsPerPageList] = useState([2, 3, 4])
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  )

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: filter,
      pagination: {
        page: page,
        perPage: 10,
      },
    },
  })

  const getProduct = ({ data }) => {
    setPage(1)
    setFilter({ barCode: data })
    refetch()
    setBarCode(data)
    setShowScanner(false)
  }

  const onDismissSnackBar = () => setVisible(false)

  const from = page * itemsPerPage
  const to = Math.min(
    (page + 1) * itemsPerPage,
    data ? data?.getProduct?.pagination.total : 0,
  )

  const submit = useCallback((data) => {
    setPage(1)

    const input = normalizeInput(data)

    setFilter(input)
    refetch()
    setOpenBrandModal(false)
    setValue('model', '')
    setValue('brand', '')
  }, [])

  useEffect(() => {
    if (data?.getProduct?.nodes.length > 0) {
      setMessage('Transação executada com sucesso.')
      setVisible(true)
    } else {
      setMessage('Nenhum produto encontrado.')
      setVisible(true)
    }
  }, [data])

  return {
    setValue,
    control,
    handleSubmit,
    formState,
    getProduct,
    product: data?.getProduct?.nodes,
    pagination: data?.getProduct?.pagination,
    loading,
    error,
    message,
    visible,
    onDismissSnackBar,
    showScanner,
    barCode,
    setShowScanner,
    setPage,
    from,
    to,
    itemsPerPage,
    numberOfItemsPerPageList,
    onItemsPerPageChange,
    page,
    setOpenBrandModal,
    openBrandModal,
    submit,
    total: data?.getProduct?.total,
  }
}

export default useStockReport

const normalizeInput = (data) => {
  for (const key in data) {
    if (typeof data[key] === 'string' && data[key].trim() === '') {
      delete data[key]
    }
  }
  return data
}
