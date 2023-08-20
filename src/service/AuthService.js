import {
    createLogoutAction
} from '../action/authActionCreator';
import store from '../store/store';

const LL_AUTH = 'auth';
const LL_ACTIVE = 'active';

class AuthService {

    login(uid) {
        localStorage.setItem(LL_AUTH, uid);
    }

    logout() {
        localStorage.removeItem(LL_AUTH);
        localStorage.removeItem('lastActivity')
        store.dispatch(createLogoutAction());
        window.location.reload();
    }

    get() {
        let value = localStorage.getItem(LL_AUTH);
        if (!value)
            return undefined;
        return value;
    }

    activate() {
        localStorage.setItem(LL_ACTIVE, true);
    }

    isActive() {
        let value = localStorage.getItem(LL_ACTIVE);
        if (!value)
            return undefined;
        return value;
    }

}

export const authService = new AuthService();