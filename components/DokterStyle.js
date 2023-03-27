import {color} from '@rneui/base';
import {StyleSheet} from 'react-native';
import './Style';

export const pilihDokterStyles = StyleSheet.create({
  title: {
    fontSize: 30,
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

  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
  },

  button: {
    borderRadius: 6,
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },
});

export const diagnosaStyles = StyleSheet.create({
  input: {
    padding: 0,
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  addIcon: {
    backgroundColor: '#00096E',
    marginTop: 20,
    width: 55,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: 'flex-end',
    paddingVertical: 5,
  },

  xIcon: {
    padding: 0,
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
  },

  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: -10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginBottom: 5,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },

  modalSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginTop: 10,
  },

  inputJumlah: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  modalButton: {
    width: '45%',
    paddingVertical: 5,
    borderRadius: 6,
  },

  modalButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },

  catatanContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 10,
  },

  button: {
    borderRadius: 6,
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },

  buttonLabel: {
    borderRadius: 6,
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },

  inputCatatan: {
    padding: 0,
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
});
