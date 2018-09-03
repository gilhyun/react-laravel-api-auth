import {observable, decorate, computed} from 'mobx';

class AppStore {
    isLoading = true;
}

decorate(AppStore, {
    isLoading: observable
});

let appStore = new AppStore();

export {appStore};