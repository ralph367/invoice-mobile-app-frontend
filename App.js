import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Items from './screens/Items/Items';
import AddItems from './screens/Items/AddItems';
import Customers from './screens/Customers/Customers';
import Invoices from './screens/Invoices/Invoices';
import EditItems from './screens/Items/EditItems';
import AddCustomers from './screens/Customers/AddCustomers';
import EditCustomers from './screens/Customers/EditCustomers';
import EditInvoices from './screens/Invoices/EditInvoices';
import AddInvoices from './screens/Invoices/AddInvoices';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="AddItems" component={AddItems} />
        <Stack.Screen name="EditItems" component={EditItems} />
        <Stack.Screen name="Customers" component={Customers} />
        <Stack.Screen name="AddCustomers" component={AddCustomers} />
        <Stack.Screen name="EditCustomers" component={EditCustomers} />
        <Stack.Screen name="Invoices" component={Invoices} />
        <Stack.Screen name="AddInvoices" component={AddInvoices} />
        <Stack.Screen name="EditInvoices" component={EditInvoices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
