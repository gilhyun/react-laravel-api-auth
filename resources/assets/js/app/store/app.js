import {observable, decorate, computed} from 'mobx';

class AppStore {
    isLoading = true;
    isLogging = false;
}

decorate(AppStore, {
    isLoading: observable,
    isLogging: observable
});

let appStore = new AppStore();

export {appStore};