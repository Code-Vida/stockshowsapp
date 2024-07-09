import * as React from 'react'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

const BrandModal = ({
  openModal,
  hideModal,
  setOpenBrandModal,
  control,
  handleSubmit,
}) => {
  return (
    <Portal>
      <Modal visible={openModal} onDismiss={hideModal} style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Pesquisar por Marca ou Modelo</Text>
            <Controller
              control={control}
              defaultValue=""
              name="brand"
              render={({ field }) => (
                <>
                  <TextInput
                    label="Marca"
                    style={styles.input}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              defaultValue=""
              name="model"
              render={({ field }) => (
                <>
                  <TextInput
                    label="Modelo"
                    style={styles.input}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                </>
              )}
            />
            <View style={styles.buttonWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                Pesquisar
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => setOpenBrandModal(false)}
              >
                Fechar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

export default BrandModal

BrandModal.propTypes = {
  openModal: PropTypes.bool,
  hideModal: PropTypes.func,
  setOpenBrandModal: PropTypes.func,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
}

const styles = StyleSheet.create({
  modal: {
    height: '70%',
    backgroundColor: '#fff',
    padding: 20,
    margin: 30,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 13,
    flex: 1,
  },
  container: {},
  box: {
    display: 'flex',
  },
  button: {
    flex: 1,
    width: '100%',
    marginLeft: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    margin: 5,
  },
})
