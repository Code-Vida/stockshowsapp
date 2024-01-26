import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-paper'

const Reports = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Button
          style={styles.buttonSales}
          mode="contained"
          onPress={() => navigation.navigate('SalesReport')}
          contentStyle={styles.buttonSales}
        >
          <Text style={{ flex: 1 }}>Vendas</Text>
        </Button>
        <Button
          style={styles.buttonStock}
          mode="contained"
          onPress={() => navigation.navigate('StockReport')}
          contentStyle={styles.buttonStock}
        >
          Estoque
        </Button>
      </View>
    </View>
  )
}

Reports.propTypes = {
  navigation: PropTypes.object,
}

export default Reports

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
  },
})
