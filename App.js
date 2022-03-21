import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Store from './src/store/Store';
import publicIP from 'react-native-public-ip';
import {observer} from 'mobx-react';
import {STYLES} from './src/config';

const getCity = IP => {
  var url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=';
  var token = 'b492fda7c1c7338172c3c34e934ef8049c1b3f33';
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
  var url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  var token = 'b492fda7c1c7338172c3c34e934ef8049c1b3f33';

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

  fetch(url, options)
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
    <>
      <StatusBar hidden />
      <View style={STYLES.container}>
        <Text style={STYLES.header}>
          Проверка практических знаний для соискателей
        </Text>
        <View style={STYLES.ip}>
          <Text style={STYLES.title}>IP = {Store.ip}</Text>
          <Text style={STYLES.title}>Город = {Store.city}</Text>
        </View>

        <View style={STYLES.search}>
          <SearchBar
            value={Store.textInput}
            placeholder="Input adress for search..."
            containerStyle={STYLES.input}
            inputStyle={{color: '#fff'}}
            searchIcon={false}
            onSubmitEditing={() => onSubmitted()}
            onChangeText={keyValue => {
              if (!keyValue.match(/[^a-zA-Zа-яА-Я\s]/g)) {
                Store.setTextInput(keyValue);
                //     //  onSubmitted() // частичный поиск при написании названия улицы
              }
            }}
          />
          <TouchableOpacity style={STYLES.button} onPress={() => onSubmitted()}>
            <Icon name="search" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, paddingBottom: 10}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={Store.spisokAdress}
            renderItem={({item}) => (
              <View style={STYLES.item}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('Адрес', item.value);
                  }}>
                  <Text style={STYLES.title}>{item.value}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
});
