import {StyleSheet} from 'react-native';

export const stylesGeneral = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    padding: 20,
  },

  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginHorizontal: 0,
    borderRadius: 6,
  },

  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    color: '#000b8d',
    fontWeight: '800',
  },

  description: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000b8d',
  },

  input: {
    backgroundColor: 'red',
    borderWidth: 2,
    alignSelf: 'center',
    backgroundColor: '#dfdfdf',
    borderColor: '#cbcbcb',
    fontSize: 14,
    paddingLeft: 10,
  },

  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10,
  },

  iconImage: {
    width: 40,
    height: 40,
  },

  iconTitle: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#0066AB',
  },
});

export const stylesLogin = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000b8d',
  },

  inputNik: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: '90%',
  },

  inputPassword: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: '90%',
  },

  rememberFPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  flexButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export const stylesFPassword = StyleSheet.create({
  sendALink: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '700',
    color: '#000b8d',
  },

  buttonLogin: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#dfdfdf',
  },

  input: {
    width: '100%',
    marginVertical: 7,
    borderRadius: 6,
  },
});

export const stylesRPassword = StyleSheet.create({
  subtitle: {
    textAlign: 'left',
  },

  button: {
    backgroundColor: 'black',
    marginTop: 30,
  },

  buttonLogin: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#dfdfdf',
  },

  input: {
    width: '100%',
  },

  inputPassword: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 15,
  },

  inputCPassword: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export const stylesRegister = {
  title: {
    textAlign: 'left',
  },

  description: {
    fontWeight: '500',
    fontSize: 15,
  },

  input: {
    width: '100%',
  },

  inputName: {
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 10,
  },

  inputNik: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  buttonTitle: {
    color: '#dfdfdf',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
};

export const stylesDashboard = StyleSheet.create({
  mainContainer: {
    margin: 20,
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  menu: {
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 5,
    color: '#000000',
    alignSelf: 'center',
  },

  menuLoginButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 7,
  },

  menuLoginButtonTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },

  accountImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },

  accountName: {
    marginRight: 10,
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },

  title: {
    color: 'black',
    textAlign: 'left',
    marginTop: 20,
    fontSize: 40,
    fontWeight: '700',
  },

  cardContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    marginRight: 12,
    width: '100%',
  },

  cardImageContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: 'black',
    alignContent: 'space-between',
  },

  cardDescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },

  cardTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
  },

  cardDescription: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  buttonPendaftaran: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 15,
    borderRadius: 7,
  },

  buttonTitlePendaftaran: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },

  statistikContainer1: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  statistikContainer2: {
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 10,
  },

  statistikTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },

  statistikSubtitle: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },

  statistikButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    columnGap: 3,
  },

  statistikButton: {
    color: 'white',
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 31,
  },

  statistikYear: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  statistikWeek: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  statistikDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statistikDescription: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
  },

  statistikArrowContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const stylesDNavbar = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    width: '60%',
    height: '100%',
    paddingVertical: 40,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },

  iconContainer: {
    flexDirection: 'row',
  },

  iconImage: {
    height: 50,
    width: 50,
  },

  iconTitle: {
    color: 'white',
    fontSize: 35,
    fontWeight: '700',
    marginLeft: 15,
  },

  buttonContainer: {
    backgroundColor: '#00096E',
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginTop: 20,
  },

  buttonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },

  menuContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    marginLeft: 15,
  },
});

export const stylesProfile = StyleSheet.create({
  profileTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    zIndex: -2
  },
  textInput: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'black',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
    width: '100%',
  },

  dropdown: {
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
  },

  dropdownPlaceholder: {
    fontSize: 15,
    fontWeight: '700',
  },

  dropdownLabelActive: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
  },

  dropdownLabel: {
    color: '#969696',
    borderWidth: 0,
    fontSize: 15,
    fontWeight: '700',
  },

  dropdownIconContainer: {
    borderWidth: 2,
  },

  dropdownContainer: {
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
  },

  dropdownListLabel: {
    fontWeight: '700',
    color: 'black',
  },

  dropdownTextActive: {
    color: 'black',
  },

  dropdownText: {
    color: '#969696',
  },

  photoProfile: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginTop: 20,
  },

  date: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 15,
    paddingLeft: 10,
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
  },

  rt: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  rw: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },

  submitButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },

  submitTitle: {
    color: 'white',
    textAlign: 'center',
  },
});

export const stylesDokter = StyleSheet.create({
  mainTitle: {
    fontSize: 35,
    fontWeight: '800',
    color: 'black',
    marginBottom: 15,
    marginTop: 25,
  },

  searchDokter: {
    borderWidth: 2,
    borderColor: 'black',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: '700',
  },

  cardContainer: {
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 6,
    flexDirection: 'row',
  },

  cardImage: {
    width: 100,
    height: 100,
  },

  cardDescriptionContainer: {
    padding: 10,
    borderLeftWidth: 2,
    borderColor: 'black',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },

  cardDescription: {
    color: 'grey',
  },

  dropdownBox: {
    borderColor: 'black',
    borderRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderTopWidth: 0,
    paddingLeft: 10,
  },

  dropdownInput: {
    fontSize: 15,
    fontWeight: '700',
  },

  dropdownInputActive: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },

  dropdownContainer: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 5,
  },

  dropdownList: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
});

export const stylesAbout = StyleSheet.create({
  clinicIcon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 20,
  },

  clinicName: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },

  clinicAddress: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 30,
  },

  contactContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },

  contactDescContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    padding: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },

  contactIcon: {
    width: 40,
    height: 40,
  },

  contactTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    padding: 10,
  },

  contactDescription: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },

  sosmedBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginHorizontal: -20,
  },

  sosmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginRight: -10,
  },

  sosmedTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },

  sosmedNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  sosmedName: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    paddingRight: '60%',
  },
});

export const stylesLoading = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  containerTop: {
    alignItems: 'center',
    alignSelf: 'center',
  },

  iconImage: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },

  iconTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0066AB',
  },
});

export const stylesPendaftaran = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
  },

  subTitle: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 5,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: 10,
  },

  buttonMainContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: -20,
    paddingLeft: 20,
    marginTop: 20,
  },

  buttonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 30,
    width: '95%',
  },

  buttonTitle: {
    width: '90%',
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },

  buttonContainerEnd: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 30,
    width: '95%',
  },
});

export const stylesAmbilNomor = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
  },

  buttonHBContainer: {
    columnGap: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  buttonHB: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  buttonHBHariIni: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  buttonHBBesok: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  buttonHBTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },

  dokterContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
  },

  dokterWaktuTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: 'black',
  },

  dokterWaktu: {
    fontWeight: '700',
    fontSize: 20,
    color: '#696969',
  },

  dokterNamaTitle: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: -15,
    marginTop: 20,
    paddingVertical: 5,
    textAlign: 'center',
  },

  dokterNama: {
    marginHorizontal: -15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 15,
    paddingVertical: 3,
  },

  dokterNamaActive: {
    backgroundColor: '#CDCDCD',
  },

  nomorButtonContainer: {
    backgroundColor: '#CDCDCD',
    marginTop: 5,
    borderRadius: 6,
    paddingVertical: 10,
  },

  nomorButtonContainerActive: {
    backgroundColor: '#00096E',
    marginTop: 5,
    borderRadius: 6,
    paddingVertical: 10,
  },

  nomorTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  ketPasienContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },

  ketPasienJumlah: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },

  selectListBox: {
    marginTop: 10,
    marginHorizontal: -10,
    borderWidth: 2,
    borderColor: 'black',
  },

  selectListText: {
    fontSize: 15,
    fontWeight: '500',
  },

  selectListTextActive: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});

export const stylesNomorAntrian = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
  },

  antrianContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 20,
    marginTop: 20,
  },

  antrianNomorContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#00096E',
    borderRadius: 200 / 2,
    width: 200,
    height: 200,
  },

  antrianNomor: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 40,
    color: 'white',
  },

  antrianNama: {
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    textAlign: 'center',
    width: '80%',
  },

  antrianWaktu: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },

  arahan: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    fontSize: 25,
    fontWeight: '700',
    padding: 10,
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
  },
});

export const stylesHasil = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    marginTop: 20,
  },

  identitasContainer: {
    borderWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  identitasText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },

  diagnosa: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 20,
    padding: 10,
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },

  obatContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 10,
  },

  obatTanggal: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 10,
  },

  pemberitahuan: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },

  tableHeader: {
    backgroundColor: 'black',
    borderWidth: 1,
  },

  tableHeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },

  tableJumlah: {
    backgroundColor: '#00096E',
  },

  tableJumlahText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },

  centerBorder: {
    borderLeftWidth: 1,
    paddingLeft: 10,
  },
});

export const stylesRiwayat = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
  },

  bulan: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 10,
  },

  ketContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 10,
    marginTop: 15,
  },

  ketTanggal: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  ketPenyakit: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
});
