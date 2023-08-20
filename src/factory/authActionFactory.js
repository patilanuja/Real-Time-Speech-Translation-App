import { authService } from '../service/AuthService';
import * as ACTIONS from '../const/action/auth';

export function createActionLogin(token, userType, userName) {
    authService.login(token, userType, userName);
    return {
        type: ACTIONS.LOGIN,
        payload: {
            token: token,
            userType: userType,
            userName: userName
        }
    }
}

export function createActionLogout() {
    authService.logout();
    return {
        type: ACTIONS.LOGOUT
    }
}