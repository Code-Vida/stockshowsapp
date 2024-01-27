import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Snackbar, Avatar, Card } from 'react-native-paper'
import QRCodeScanner from 'react-native-qrcode-scanner'
import useSales from './use-sales/use-sales'
import { registerTranslation } from 'react-native-paper-dates'
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

const Sales = () => {
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
    control,
    handleSubmit,
    setValue,
  } = useSales()

  useEffect(() => {
    if (barCode) {
      setValue('barCode', barCode)
    }
    if (product) {
      setValue('id', product?.id || '')
      setValue('brand', product?.brand || '')
      setValue('model', product?.model || '')
      setValue('color', product?.color || '')
      setValue('number', product?.number ? product.number.toString() : '')
      setValue('value', product?.value ? product.value.toString() : '')
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
            <Button
              icon="camera"
              mode="contained"
              style={{
                flex: 1,
                marginLeft: 5,
                marginRight: 5,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              contentStyle={{
                flex: 1,
                flexDirection: 'row',
                width: 340,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              onPress={() => setShowScanner(true)}
            >
              Scan
            </Button>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="barCode"
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Código de barras"
                      subtitle={field.value}
                      left={(props) => (
                        <Avatar.Icon {...props} icon="barcode" />
                      )}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
                      style={styles.input}
                    />
                  </>
                )}
              />
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="brand"
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Marca"
                      subtitle={field.value}
                      left={(props) => <Avatar.Icon {...props} icon="tag" />}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
                      style={styles.input}
                    />
                  </>
                )}
              />
            </View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="model"
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Modelo"
                      subtitle={field.value}
                      left={(props) => <Avatar.Icon {...props} icon="label" />}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
                      style={styles.input}
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
                name="color"
                flex={1}
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Cor"
                      subtitle={field.value}
                      left={(props) => (
                        <Avatar.Icon {...props} icon="palette" />
                      )}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
                      style={styles.input}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
              <Controller
                control={control}
                defaultValue=""
                name="number"
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Número"
                      subtitle={field.value}
                      left={(props) => (
                        <Avatar.Icon {...props} icon="palette" />
                      )}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
                      style={styles.input}
                    />
                    {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                  </>
                )}
              />
            </View>
            <View style={styles.box}></View>
            <View style={styles.box}>
              <Controller
                control={control}
                defaultValue=""
                name="value"
                render={({ field }) => (
                  <>
                    <Card.Title
                      title="Valor"
                      style={styles.input}
                      subtitle={field.value}
                      left={(props) => <Avatar.Icon {...props} icon="cash" />}
                      titleStyle={styles.text}
                      subtitleStyle={styles.text}
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
                disabled={!product}
              >
                Saída
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 100,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    color: '#000',
  },
  boxCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
})

export default Sales
