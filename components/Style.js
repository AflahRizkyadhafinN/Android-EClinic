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

  loginButton: {
    backgroundColor: 'black',
    marginRight: 10,
  },

  loginTitle: {
    color: '#dfdfdf',
  },

  rememberFPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },

  flexButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  registerButton: {
    backgroundColor: '#dfdfdf',
  },

  registerTitle: {
    color: 'black',
  },
});

export const stylesFPassword = StyleSheet.create({
  sendALink: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '700',
    color: '#000b8d',
  },

  button: {
    backgroundColor: 'black',
    marginTop: 0,
  },

  buttonLogin: {
    textAlign: 'center',
    fontWeight: '700',
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
    fontWeight: '700',
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

  button: {
    marginTop: 10,
    backgroundColor: 'black',
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

  buttonBurger: {
    width: 25,
    height: 25,
  },

  menuContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  menu: {
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000000',
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
    marginTop: 20,
    flexDirection: 'row',
  },

  menuIcon: {
    height: 25,
    width: 25,
  },

  menuTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    marginLeft: 15,
    marginTop: -5,
  },
});

export const stylesProfile = StyleSheet.create({
  profileTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  textInput: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'black',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
  },

  selectList: {
    fontSize: 15,
    fontWeight: '700',
  },

  dropdown: {
    borderWidth: 2,
    borderColor: 'black',
  },

  dropdownText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },

  photoProfile: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
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

  searchButtonContainer: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopWidth: 3,
    marginBottom: 20,
  },

  searchButtonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    borderTopColor: 'black',
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

  sosmedIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
  },

  sosmedName: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    paddingRight: '60%',
  },

  sosmedArrow: {
    marginRight: 10,
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
