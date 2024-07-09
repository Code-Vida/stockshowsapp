import * as React from 'react'
import {
  Modal,
  Portal,
  Text,
  DataTable,
  IconButton,
  ActivityIndicator,
  MD2Colors,
  Snackbar,
} from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

const ChooseProductModal = ({
  openModal,
  products,
  setChoosenProduct,
  setOpenChooseProduct,
  message,
  visible,
  onDismissSnackBar,
}) => {
  return (
    <Portal>
      <Modal
        visible={openModal}
        // onDismiss={hideModal}
        style={styles.modal}
        onDismiss={() => setOpenChooseProduct(false)}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Escolher produto</Text>
            <View style={styles.table}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title textStyle={styles.title} style={{ flex: 4 }}>
                    Marca
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title} style={{ flex: 4 }}>
                    Modelo
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title} style={{ flex: 3 }}>
                    Cor
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.number}
                    style={{ flex: 1 }}
                  >
                    Nº
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.number}
                    style={{ flex: 1 }}
                  >
                    Qtd
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.title}
                    style={{ flex: 1 }}
                  ></DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                  {products ? (
                    products.map((row) => {
                      return (
                        <DataTable.Row key={row.id}>
                          <DataTable.Cell style={{ flex: 4 }}>
                            {row.brand}
                          </DataTable.Cell>
                          <DataTable.Cell style={{ flex: 4 }}>
                            {row.model}
                          </DataTable.Cell>
                          <DataTable.Cell style={{ flex: 3 }}>
                            {row.color}
                          </DataTable.Cell>
                          <DataTable.Cell style={{ flex: 1 }} numeric>
                            {row.number}
                          </DataTable.Cell>
                          <DataTable.Cell style={{ flex: 1 }} numeric>
                            {row.amount - row.sales}
                          </DataTable.Cell>
                          <DataTable.Cell style={{ flex: 1 }}>
                            <IconButton
                              icon="check"
                              onPress={() => {
                                setChoosenProduct(row)
                                setOpenChooseProduct(false)
                              }}
                            />
                          </DataTable.Cell>
                        </DataTable.Row>
                      )
                    })
                  ) : (
                    <View style={styles.loading}>
                      <ActivityIndicator
                        animating={true}
                        color={MD2Colors.red800}
                      />
                    </View>
                  )}
                </ScrollView>
              </DataTable>
            </View>
          </View>
        </View>
      </Modal>
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
    </Portal>
  )
}

export default ChooseProductModal

ChooseProductModal.propTypes = {
  openModal: PropTypes.bool,
  setChoosenProduct: PropTypes.func,
  setOpenBrandModal: PropTypes.func,
  control: PropTypes.object,
  setOpenChooseProduct: PropTypes.func,
  products: PropTypes.array,
  message: PropTypes.string,
  visible: PropTypes.bool,
  onDismissSnackBar: PropTypes.func,
}

const styles = StyleSheet.create({
  modal: {
    height: '70%',
    backgroundColor: '#fff',
    padding: 5,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 13,
  },
  container: {},
  box: {
    display: 'flex',
  },
  button: {
    marginLeft: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    margin: 5,
  },
  table: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '95%',
    justifyContent: 'space-between',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  model: {
    width: 140,
  },
  title: {
    flex: 1,
  },
  number: {
    flex: 1,
  },
})
