import EventEmitter from 'eventemitter3';

class MessageService {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    onMessage(listener) {
        this.eventEmitter.on('SHOW_MESSAGE', listener)
    }

    emitMessage(title, message) {
        this.eventEmitter.emit('SHOW_MESSAGE', {title, message});
    }

    onWarn(listener) {
        this.eventEmitter.on('SHOW_WARN', listener)
    }

    emitWarn(title, message) {
        this.eventEmitter.emit('SHOW_WARN', {title, message});
    }

    onError(listener) {
        this.eventEmitter.on('SHOW_ERROR', listener)
    }

    emitError(title, message) {
        this.eventEmitter.emit('SHOW_ERROR', {title, message});
    }

}

export const messageService = new MessageService();