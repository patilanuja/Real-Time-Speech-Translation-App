import axios from 'axios';
import { messageService } from '../service/MessageService';
import { authService } from '../service/AuthService';

const config = {
    validateStatus: function (status) {
        return true;
    }
}

const urlBase = 'https://6tlobxaeth.execute-api.us-east-1.amazonaws.com';

export async function get(url) {
    let logout = checkTimer();
    if (!logout)
        updateTimer();
    return await axios.get(url, config)
        .then(response => {
            return handleResponse(response);
        }).catch(err => {
            console.log(err)
            return errorResponse();
        });
}

export async function post(url, data = {}, token) {
    let logout = checkTimer();
    if (!logout)
        updateTimer();
    return await axios.post(url, data, config)
        .then(response => {
            return handleResponse(response);
        }).catch(err => {
            console.log(err)
            return errorResponse();
        });
}

export async function put(url, headers, data) {
    let logout = checkTimer();
    if (!logout)
        updateTimer();
    return await axios.put(url, data, {
        headers: headers
        }).then(response => {
            return handleResponse(response);
        }).catch(err => {
            console.log(err)
            return errorResponse();
        });
}

function handleResponse(response) {
    switch (response.status) {
        case 200: {
            return response.data;
        }
        default: {
            return errorResponse();
        }
    }
}

function errorResponse() {
    messageService.emitError('Something  wrong', 'Please, try again later');
    return null;
}

function checkTimer() {
    let ms = Math.abs(new Date() - new Date(localStorage.getItem('lastActivity')));
    if (((ms / 1000) / 60 > 10) && authService.get()) {
        authService.logout();
        return true;
    }
    return false;
}

function updateTimer() {
    localStorage.setItem('lastActivity', new Date());
}