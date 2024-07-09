import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import QRCodeScanner from 'react-native-qrcode-scanner'
import useStock from './use-stock/use-stock'
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates'
import { Controller } from 'react-hook-form'

registerTranslation('pt', {
  save: 'Salvar',
  selectSingle: 'Selecione',
  selectMultiple: 'Selecione',
  selectRange: 'Selecione',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Voltar',
  next: 'Próximo',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Selecione a data no calendário',
  close: 'Fechar',
})

const Stock = () => {
  const qrcodeRef = useRef()
  const [flash, setFlash] = useState('off')

  const {
    getProduct,
    showScanner,
    setShowScanner,
    barCode,
    product,
    visible,
    onDismissSnackBar,
    submit,
    message,
    setValue,
    control,
    handleSubmit,
    errors,
    setBarCode,
    submitSearch,
    setBrand,
  } = useStock()
  useEffect(() => {
    if (barCode) {
      setValue('barCode', barCode)
    }
    if (product) {
      setValue('id', product?.id || '')
      setValue('barCode', product?.barCode || '')
      setValue('brand', product?.brand || '')
      setValue('model', product?.model || '')
      setValue('color', product?.color || '')
      setValue('amount', product?.amount ? product.amount.toString() : '')
      setValue('number', product?.number ? product.number.toString() : '')
      setValue(
        'purchaseValue',
        product?.purchaseValue ? product.purchaseValue.toString() : '',
      )
      setValue('value', product?.value ? product.value.toString() : '')
      setValue(
        'purchaseDate',
        product?.purchaseDate ? new Date(product?.purchaseDate) : '',
      )
    }
  }, [barCode, product])
  return (
    <View style={{ flex: 1 }}>
      {showScanner ? (
        <QRCodeScanner
          ref={qrcodeRef}
          onRead={getProduct}
          flashMode={flash}
          topContent={
            <View style={styles.boxCamera}>
              <Button
                icon="flash"
                mode="contained"
                onPress={() =>
                  flash === 'torch' ? setFlash('off') : setFlash('torch')
                }
                style={{ margin: 10 }}
              >
                Flash
              </Button>
            </View>
          }
        />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                rules={{
                  required: 'Campo obrigatório',
                }}
                name="barCode"
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Código de barras"
                      style={styles.input}
                      value={barCode || field.value}
                      onBlur={() => {
                        field.onBlur()
                        getProduct({ data: field.value })
                      }}
                      onChangeText={(text) => {
                        setBarCode(text)
                        field.onChange(text)
                      }}
                      error={errors?.barCode?.message}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Button
                icon="camera"
                mode="contained"
                style={styles.button}
                onPress={() => setShowScanner(true)}
              >
                Scan
              </Button>
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="brand"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Marca"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={(text) => {
                        setBrand(text)
                        field.onChange(text)
                      }}
                      error={errors?.brand?.message}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Button
                style={styles.button}
                icon="search-web"
                mode="contained"
                onPress={() => submitSearch()}
                //disabled={!formState.isValid}
              >
                Buscar
              </Button>
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="model"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Modelo"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors?.model?.message}
                    />
                  </>
                )}
              />
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="color"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Cor"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors?.color?.message}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="number"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Número"
                      keyboardType="numeric"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors?.number?.message}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="amount"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Quantidade"
                      keyboardType="numeric"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors?.amount?.message}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="purchaseDate"
                render={({ field }) => {
                  return (
                    <>
                      <DatePickerInput
                        style={styles.input}
                        locale="pt"
                        label="Data da compra"
                        value={
                          field.value ? new Date(field.value) : field.value
                        }
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        inputMode="start"
                        autoComplete="birthdate-full"
                        // mode="outlined" (see react-native-paper docs)
                        // other react native TextInput props
                      />
                    </>
                  )
                }}
              />
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="purchaseValue"
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Valor de compra"
                      keyboardType="numeric"
                      style={styles.input}
                      value={new Date(field.value)}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="value"
                render={({ field }) => (
                  <>
                    <TextInput
                      label="Valor de venda"
                      keyboardType="numeric"
                      style={styles.input}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
            </View>

            <View style={styles.box}>
              <Button
                style={{ flex: 1, margin: 8 }}
                mode="contained"
                onPress={handleSubmit(submit)}
                //disabled={!formState.isValid}
              >
                Entrada
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: () => {
            // Do something
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'space-around',
  },
  button: {
    width: 130,
    marginLeft: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 130,
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  boxCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  error: {
    color: 'red',
  },
})

export default Stock
