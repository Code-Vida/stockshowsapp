import React, { useRef, useState } from 'react'
import { DataTable, Text } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Button,
  Snackbar,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Fab from '../../components/fab'
import BrandModal from '../../components/brandModal'

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
    setShowScanner,
    setPage,
    page,
    loading,
    pagination,
    setOpenBrandModal,
    openBrandModal,
    handleSubmit,
    submit,
    total,
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
            <Text>Total de Vendas: {total?.totalSalesSum.toFixed(2)}</Text>
            <Text>Total de produtos: {total?.totalSum.toFixed(2)}</Text>
          </View>
          <View style={styles.table}>
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
                  Número
                </DataTable.Title>
                <DataTable.Title textStyle={styles.title}>Qtd</DataTable.Title>
                <DataTable.Title textStyle={styles.title}>
                  Preço compra
                </DataTable.Title>
                <DataTable.Title textStyle={styles.title}>
                  Preço venda
                </DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {!product && (
                  <ActivityIndicator
                    animating={loading}
                    color={MD2Colors.red800}
                  />
                )}
                {product &&
                  product.map((row) => {
                    return (
                      <DataTable.Row key={row.id}>
                        <DataTable.Cell
                          style={styles.title}
                          textStyle={styles.title}
                        >
                          {row.brand}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.model}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.color}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.number}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.amount - row.sales}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.purchaseValue}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={styles.title}>
                          {row.value}
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  })}
              </ScrollView>
              <DataTable.Pagination
                style={styles.pagination}
                textStyle={styles.title}
                page={page}
                numberOfPages={pagination?.lastPage || 0}
                onPageChange={(page) => setPage(page)}
                label={`${pagination?.page || 0} de ${
                  pagination?.lastPage || 0
                }`}
                // numberOfItemsPerPageList={numberOfItemsPerPageList}
                // numberOfItemsPerPage={itemsPerPage}
                // onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                // selectPageDropdownLabel={'Rows per page'}
              />
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
      <Fab
        setShowScanner={setShowScanner}
        setOpenBrandModal={setOpenBrandModal}
      />

      <BrandModal
        openModal={openBrandModal}
        setOpenBrandModal={setOpenBrandModal}
        control={control}
        handleSubmit={handleSubmit(submit)}
      />
    </View>
  )
}

export default StockReport

const styles = StyleSheet.create({
  title: {
    color: '#000',
    alignContent: 'center',
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
  table: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 150,
    justifyContent: 'space-between',
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
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pagination: {
    justifyContent: 'flex-start',
  },
})
