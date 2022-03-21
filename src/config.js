import {StyleSheet} from 'react-native';

const colorTitle = '#fff';
const colorBackground = '#181D2E';
const colorItems = '#424D6D';
const sizeFont = 16;
const height = 70;

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorBackground,
  },
  header: {
    textAlign: 'center',
    fontSize: sizeFont + 2,
    fontWeight: 'bold',
    padding: 10,
    color: colorTitle,
    width: '90%',
  },
  input: {
    flex: 4,
    height: height,
    borderWidth: 1,
    borderRadius: 10,    
    backgroundColor: '#000',    
  },
  ip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 7,
    borderRadius: 10,  
    height: height,
    backgroundColor: '#000',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: colorItems,
    borderWidth: 7,
  },
  item: {    
    height: 70,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: '100%',    
    backgroundColor: colorItems,
    justifyContent: 'center',
  },
  title: {
    fontSize: sizeFont,
    fontFamily: 'Roboto',   
    fontWeight: 'bold',
    color: colorTitle,
  },
  image: {
    width: 70,
    height: 70,
  },
});
