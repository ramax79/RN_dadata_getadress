import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Store from './src/store/Store';
import publicIP from 'react-native-public-ip';
import {observer} from 'mobx-react';

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
      const data = result.suggestions.map(t => t.value);
      Store.setSpisokAdress(data);
    })
    .catch(error => console.log('error', error));
};

export default App = observer(() => {
  const [text, setText] = useState('Ленина');

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
    <View style={styles.container}>
      <Text style={styles.header}>
        Проверка практических знаний для соискателей
      </Text>
      <View style={styles.ip}>
        <Text>IP = {Store.ip}</Text>
        <Text>Город = {Store.city}</Text>
      </View>
      <View style={styles.ip}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          autoFocus={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => getAdress(Store.city, text)}>
          <Text style={{textAlign: 'center'}}>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        {Store.spisokAdress.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    paddingLeft: 10,
  },
  ip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: '23%',
    height: 40,
  },
});
