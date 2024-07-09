import React from 'react'
import Home from 'screens/home/home'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Sales from 'screens/sales/sales'
import Devolution from 'screens/devolution/devolution'
import Products from 'screens/products/products'
import Reports from 'screens/reports/reports'
import Stock from 'screens/stock/stock'
import SalesReport from 'screens/salesReport/salesReport'
import StockReport from 'screens/stockReport/stockReport'
import { client } from './resources/api'
import { ApolloProvider } from '@apollo/client'
import { pt, registerTranslation } from 'react-native-paper-dates'
import PropTypes from 'prop-types'
registerTranslation('en-GB', pt)

const Stack = createStackNavigator()
const HomeScreen = ({ navigation }) => <Home navigation={navigation} />

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000',
  },
}

const App = () => (
  <ApolloProvider client={client}>
    <PaperProvider theme={PaperDefaultTheme}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Sales"
            component={Sales}
            options={{ title: 'Vendas / Saída' }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{ title: 'Produtos' }}
          />
          <Stack.Screen
            name="Reports"
            component={Reports}
            options={{ title: 'Relatórios' }}
          />
          <Stack.Screen
            name="Stock"
            component={Stock}
            options={{ title: 'Estoque / Entrada' }}
          />
          <Stack.Screen
            name="SalesReport"
            component={SalesReport}
            options={{ title: 'Relatórios' }}
          />
          <Stack.Screen
            name="StockReport"
            component={StockReport}
            options={{ title: 'Relatórios' }}
          />
          <Stack.Screen
            name="Devolution"
            component={Devolution}
            options={{ title: 'Trocas / Devoluções' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ApolloProvider>
)

export default App

HomeScreen.propTypes = {
  navigation: PropTypes.object,
}
