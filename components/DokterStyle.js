import {color} from '@rneui/base';
import {StyleSheet} from 'react-native';

export const pilihDokterStyles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  menuTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '800',
  },

  secondContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'black',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 20,
  },

  dropdown: {
    backgroundColor: '#f2f2f2',
  },

  dropdownLabel: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },

  dropdownContainer: {backgroundColor: '#f2f2f2'},

  dropdownList: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },

  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});

export const cDiagnosaStyles = StyleSheet.create({
  firstContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 10,
  },

  fcText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },

  buttonContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'black',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 10,
  },

  buttonText: {
    backgroundColor: '#00096E',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '50%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 6,
  },
});
