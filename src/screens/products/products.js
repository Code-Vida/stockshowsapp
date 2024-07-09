import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-paper'

const Products = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Button
          style={styles.buttonSales}
          mode="contained"
          onPress={() => navigation.navigate('Sales')}
          contentStyle={styles.buttonSales}
        >
          <Text style={{ flex: 1 }}>Saida</Text>
        </Button>
        <Button
          style={styles.buttonStock}
          mode="contained"
          onPress={() => navigation.navigate('Stock')}
          contentStyle={styles.buttonStock}
        >
          Entrada
        </Button>
      </View>
      <View style={styles.box}>
        <Button
          style={styles.buttonDevolution}
          mode="contained"
          onPress={() => navigation.navigate('Devolution')}
          contentStyle={styles.buttonDevolution}
        >
          <Text style={{ flex: 1 }}>Troca / Devolução</Text>
        </Button>
      </View>
    </View>
  )
}

Products.propTypes = {
  navigation: PropTypes.object,
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
  },
  buttonSales: {
    flex: 1,
    margin: 3,
    marginLeft: 8,
    marginRight: 8,
    height: 100,
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#77eda4',
  },
  buttonStock: {
    flex: 1,
    margin: 3,
    marginLeft: 8,
    marginRight: 8,
    height: 100,
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#ed7777',
  },
  buttonDevolution: {
    flex: 1,
    margin: 3,
    marginLeft: 8,
    marginRight: 8,
    height: 100,
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#77aeed',
  },
})
