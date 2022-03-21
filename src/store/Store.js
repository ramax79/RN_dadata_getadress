import {makeAutoObservable} from 'mobx';

class Store {
  ip = '';
  city = '';
  textInput = 'Ленина';
  spisokAdress = [];
  constructor() {
    makeAutoObservable(this);
  }
  setIP(ip) {
    this.ip = ip;
  }
  setCity(city) {
    this.city = city;
  }
  setSpisokAdress(data) {
    this.spisokAdress = data;
  }
  setTextInput(data) {
    this.textInput = data;
  }
}

export default new Store();
