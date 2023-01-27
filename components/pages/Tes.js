import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export const Tes = () => {
  const windows = useWindowDimensions();

  return (
    <View style={stylesDashboard.mainContainer}>
      <ScrollView pagingEnabled style={{}}>
        <View style={stylesDashboard.cardContainer}>
          <Image
            style={stylesDashboard.cardImage}
            source={require('../image/people.png')}
          />
          <View style={stylesDashboard.cardDescriptionContainer}>
            <Text style={stylesDashboard.cardTitle}>36</Text>
            <Text style={stylesDashboard.cardDescription}>
              Jumlah orang yang telah registrasi
            </Text>
          </View>
        </View>
        <View style={stylesDashboard.cardContainer}>
          <Image
            style={stylesDashboard.cardImage}
            source={require('../image/Termometer.png')}
          />
          <View style={stylesDashboard.cardDescriptionContainer}>
            <Text style={stylesDashboard.cardTitle}>36</Text>
            <Text style={stylesDashboard.cardDescription}>
              Jumlah orang yang telah registrasi
            </Text>
          </View>
        </View>
        <View style={stylesDashboard.cardContainer}>
          <Image
            style={stylesDashboard.cardImage}
            source={require('../image/dokterIcon.png')}
          />
          <View style={stylesDashboard.cardDescriptionContainer}>
            <Text style={stylesDashboard.cardTitle}>36</Text>
            <Text style={stylesDashboard.cardDescription}>
              Jumlah orang yang telah registrasi
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const stylesDashboard = StyleSheet.create({
  mainContainer: {
    // margin: 20,
  },

  cardContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },

  cardImage: {
    resizeMode: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },

  cardDescriptionContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },

  cardDescription: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    width: '80%',
  },
});
