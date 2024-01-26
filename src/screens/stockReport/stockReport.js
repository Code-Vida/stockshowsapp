import React, { useRef, useState } from 'react'
import { DataTable } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, Snackbar, TextInput } from 'react-native-paper'
import QRCodeScanner from 'react-native-qrcode-scanner'

import useStockReport from './use-stock-report/use-stock-report'

const StockReport = () => {
  const qrcodeRef = useRef()
  const [flash, setFlash] = useState('off')
  const {
    control,
    product,
    visible,
    onDismissSnackBar,
    message,
    showScanner,
    getProduct,
    barCode,
    setShowScanner,
  } = useStockReport()

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
        <View style={styles.container}>
          <View style={styles.box}>
            <Controller
              control={control}
              defaultValue=""
              name="barCode"
              render={({ field }) => (
                <>
                  <TextInput
                    label="Código de barras"
                    style={styles.input}
                    value={barCode}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                  {/* <HelperText type="error">{errors?.name?.message}</HelperText> */}
                </>
              )}
            />
            <Button
              icon="camera"
              mode="contained"
              style={{
                marginLeft: 5,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowScanner(true)}
            >
              Scan
            </Button>
          </View>

          <View style={styles.box}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={styles.title}>
                  Marca
                </DataTable.Title>
                <DataTable.Title textStyle={styles.title}>
                  Modelo
                </DataTable.Title>
                <DataTable.Title textStyle={styles.title}>Cor</DataTable.Title>
                <DataTable.Title textStyle={styles.title}>
                  Quantidade
                </DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {product && (
                  <DataTable.Row key={product.id}>
                    <DataTable.Cell
                      style={styles.title}
                      textStyle={styles.title}
                    >
                      {product.brand}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.title}>
                      {product.model}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.title}>
                      {product.color}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={styles.title}>
                      {product.amount}
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </ScrollView>
              {/* <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />  */}
            </DataTable>
          </View>
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
      )}
    </View>
  )
}

export default StockReport

const styles = StyleSheet.create({
  title: {
    color: '#000',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boxCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  input: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
})
