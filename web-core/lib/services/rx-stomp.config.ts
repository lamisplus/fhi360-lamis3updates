declare const SockJS: any;

const source = 'http://' + window.location.host + '/websocket';

export const RxStompConfig = {
    // Which server?
    brokerURL: '' + source,
    webSocketFactory: () => {
        return new SockJS('' + source);
    },
    // Headers
    // Typical keys: login, passcode, host
    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },
    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0,
    // Typical value 0 - disabled
    heartbeatOutgoing: 20000,
// Typical value 20000 - every 20 seconds
// Wait in milliseconds before attempting auto reconnect
// Set to 0 to disable
// Typical value 500 (500 milli seconds)
};
