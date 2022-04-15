import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Store from './src/store/Store';
import publicIP from 'react-native-public-ip';
import {observer} from 'mobx-react';
import {STYLES, theme} from './src/config';
import Config from 'react-native-config';

const url = Config.url; 
const urlAdress = Config.urlAdress;
const token = Config.token; 

const getCity = IP => {
  //https://dadata.ru/api/iplocate/#usage

  var query = IP;

  var options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
  };

  fetch(url + query, options)
    .then(response => response.json())
    .then(result => {
      Store.setCity(result.location.data.city);
    })
    .catch(error => console.log('error', error));
};

const getAdress = (storeCity, StoreAdress) => {
  //https://dadata.ru/api/suggest/address/

  var options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({
      query: StoreAdress, // Текст запроса
      locations: [
        {
          // Ограничение по родителю
          city: storeCity,
        },
      ],
    }),
  };

  fetch(urlAdress, options)
    .then(response => response.json())
    .then(result => {
      Store.setSpisokAdress(result.suggestions);      
      // Keyboard.dismiss();
    })
    .catch(error => console.log('error', error));
};

export default App = observer(() => {
  const onSubmitted = () => {
    getAdress(Store.city, Store.textInput);
    Keyboard.dismiss();
  };

  publicIP()
    .then(ip => {
      Store.setIP(ip);
      getCity(ip);
    })
    .catch(error => {
      console.log(error);
      // 'Unable to get IP address.'
    });

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.header}>Поиск адреса в городе</Text>
      <View style={STYLES.ip}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Icon name="public" size={20} color={theme.colorIcon} />
          <Text style={STYLES.title}>IP = {Store.ip}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Icon name="room" size={20} color={theme.colorIcon} />
          <Text style={STYLES.title}>Город = {Store.city}</Text>
        </View>
      </View>

      <View style={STYLES.search}>
        <TextInput
          style={STYLES.textinput}
          value={Store.textInput}
          placeholder="Input adress for search..."
          onSubmitEditing={() => onSubmitted()}
          onChangeText={keyValue => {
            if (!keyValue.match(/[^a-zA-Zа-яА-Я\s]/g)) {
              Store.setTextInput(keyValue);
              //     //  onSubmitted() // частичный поиск при написании названия улицы
            }
          }}
        />
        <TouchableOpacity style={STYLES.button} onPress={() => onSubmitted()}>
          <Icon name="search" size={30} color={theme.colorIcon} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 10, paddingBottom: 10}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Store.spisokAdress}
          renderItem={({item}) => (
            <View style={STYLES.item}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Адрес', item.value);
                }}>
                <Text
                  style={STYLES.text}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
});
