import React from 'react';
import ProgressBar from 'react-native-animated-progress';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {stylesGeneral} from '../Style';

export const Tes = () => {
  return (
    <ScrollView>
      <View>
        <Image source={require('../image/people.png')} />
      </View>
    </ScrollView>
  );
};

const stylesDashboard = StyleSheet.create({});
