import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-paper'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Products')}
          contentStyle={styles.button}
        >
          <Text style={{ flex: 1 }}>Produtos</Text>
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Reports')}
          contentStyle={styles.button}
        >
          Relátorios
        </Button>
      </View>
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.object,
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
  },
  button: {
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
