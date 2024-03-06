import * as React from 'react'
import { Modal, Portal, Text, DataTable, IconButton } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

const ChooseProductModal = ({
  openModal,
  products,
  setChoosenProduct,
  setOpenChooseProduct,
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
                  <DataTable.Title textStyle={styles.title}>
                    Marca
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title}>
                    Modelo
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title}>
                    Cor
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title}>
                    Número
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title}>
                    Qtd
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.title}>
                    Escolher
                  </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                  {products &&
                    products.map((row) => {
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
                          <DataTable.Cell numeric>
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
                    })}
                </ScrollView>
              </DataTable>
            </View>
          </View>
        </View>
      </Modal>
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
}

const styles = StyleSheet.create({
  modal: {
    height: '70%',
    backgroundColor: '#fff',
    padding: 10,
    margin: 30,
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
  model: {
    width: 140,
  },
})
