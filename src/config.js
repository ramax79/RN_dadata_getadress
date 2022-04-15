import {StyleSheet, Dimensions} from 'react-native';

// const colorTitle = '#fff';
// const backgroundColor = '#F6F6F6'; // '#181D2E';
// const colorItems = '#424D6D';
const {width} = Dimensions.get('window');
const fontSize = 16;
const height = 50;
const borderRadius = 10;
const themeLight = {
  backgroundColor: '#F6F6F6',
  colorTitle: '#111111',
  colorItems: '#EBEBEB',
  backgroundColorTextSearch: '#EBEBEB',
  backgroundColorButton: '#EBEBEB',
  colorIcon: '#111111',
};
const themeDark = {
  backgroundColor: '#181D2E',
  colorTitle: '#fff',
  colorItems: '#424D6D',
  backgroundColorTextSearch: '#181D2E',
  backgroundColorButton: '#181D2E',
  colorIcon: '#111111',
};
const themeLightNoBacground = {
  // backgroundColor: '#F6F6F6',
  colorTitle: '#414BBE',
  colorItems: '#EBEBEB',
  backgroundColorTextSearch: '#EBEBEB',
  backgroundColorButton: '#EBEBEB',
  colorIcon: '#78C2F8',
  BorderBottomColor: '#F6F6F6',
  borderBottomWidth: 3,
};

export const theme = themeLightNoBacground;
export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    textAlign: 'center',
    fontSize: fontSize + 2,
    fontWeight: 'bold',
    padding: 10,
    color: theme.colorTitle,
    width: '90%',
  },
  textinput: {
    flex: 4,
    height: height,
    paddingLeft: 10,

    fontSize,
    color: theme.colorTitle,
  },
  ip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height,
    // backgroundColor: theme.backgroundColorButton,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // borderColor: theme.colorItems,
    backgroundColor: theme.backgroundColor ? theme.colorItems : null,
    borderRadius,
    borderBottomColor: theme.BorderBottomColor ? theme.BorderBottomColor : null,
    borderBottomWidth: theme.borderBottomWidth ? theme.borderBottomWidth : null,
  },
  item: {
    height,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: '100%',
    backgroundColor: theme.colorItems,
    borderRadius,
    justifyContent: 'center',
  },
  title: {
    fontSize,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: theme.colorTitle,
    // width: '100%',
  },
  text: {
    fontSize,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: theme.colorTitle,
  },
  image: {
    width: 70,
    height,
  },
});
