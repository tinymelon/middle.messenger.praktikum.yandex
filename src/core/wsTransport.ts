import EventBus from "./eventBus";
import constants from "../constants";

export const WsTransportEvents = {
    ERROR: "error",
    OPEN: "open",
    CLOSE: "close",
    MESSAGE: "message"
};

export default class WsTransport extends EventBus {
    private socket?: WebSocket;
    private pingInterval?: ReturnType<typeof setInterval>
    private readonly pingIntervalTime = 30000;
    private readonly url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Нет соединения');
        }

        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(`${constants.WSHOST}${this.url}`);
        this.subscribe(this.socket);
        this.setupPing();
        return new Promise((resolve, reject) => {
            this.on(WsTransportEvents.ERROR, reject);
            this.on(WsTransportEvents.OPEN, () => {
                this.off(WsTransportEvents.ERROR, reject);
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
        clearInterval(this.pingInterval);
    }

    private setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({type: 'ping'});
        }, this.pingIntervalTime);

        this.on('close', () => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        });
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WsTransportEvents.OPEN);
        });
        socket.addEventListener('close', () => {
            this.emit(WsTransportEvents.CLOSE);
        });
        socket.addEventListener('error', () => {
            this.emit(WsTransportEvents.ERROR);
        });

        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);
                if ((<any>['pong', 'user connected']).includes(data?.type)) {
                    return;
                }
                this.emit(WsTransportEvents.MESSAGE, data);
            } catch (e) {

            }
        });
    }
}
