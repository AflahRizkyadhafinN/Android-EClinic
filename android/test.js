import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function Test({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go back" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.navigate('test')} />
      </View>
    );
  }