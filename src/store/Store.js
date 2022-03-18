import {makeAutoObservable} from 'mobx';

class Store {
  ip = '';
  city = '';
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
}

export default new Store();
