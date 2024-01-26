import { SALES_REPORT } from './graphql'
import { useLazyQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'

const useSalesReport = () => {
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  })
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState()

  const [salesReportQuery, { loading, error, data }] = useLazyQuery(
    SALES_REPORT,
    {
      fetchPolicy: 'no-cache',
    },
  )

  const submit = useCallback(
    (data) => {
      salesReportQuery({
        variables: {
          input: { data },
        },
      })
    },
    [salesReportQuery],
  )
  useEffect(() => {
    if (data) {
      if (data.salesReport.nodes.length === 0) {
        setMessage('Nenhuma transação encontrada')
        setVisible(true)
      }
    }
    if (error) {
      setMessage('Erro ao executar a transação')
      setVisible(true)
    }
  }, [data, error])

  const onDismissSnackBar = () => setVisible(false)

  return {
    setValue,
    control,
    handleSubmit,
    formState,
    submit,
    salesReport: data?.salesReport?.nodes,
    loading,
    error,
    message,
    visible,
    onDismissSnackBar,
  }
}

export default useSalesReport
