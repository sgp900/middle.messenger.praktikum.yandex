import { EventBus } from "./eventBus";

export enum SocketEvent {
  Message = "message",
  Close = "close",
}

export class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number | undefined = undefined;

  constructor(private url: string) {
    super();
  }

  public connect() {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    return new Promise<void>((resolve, reject) => {
      this.socket!.addEventListener("open", () => {
        this.setupPingPong();
        resolve();
      });
      this.socket!.addEventListener("close", reject);
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Websocket connection is not establish yet");
    } else {
      this.socket.send(JSON.stringify(data));
    }
  }

  public close() {
    clearInterval(this.pingInterval);
    this.socket?.close();
  }

  private setupPingPong() {
    this.pingInterval = window.setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("message", (message) => {
      let data: any = "";

      try {
        data = JSON.parse(message.data);
      } catch (e) {
        if (e instanceof SyntaxError) {
          throw new Error(e.message);
        } else {
          throw new Error("Cant parse JSON data");
        }
      }

      if (data?.type === "pong") {
        return;
      }
      this.emit(SocketEvent.Message, data);
    });

    socket.addEventListener("close", () => {
      this.emit(SocketEvent.Close);
    });
  }
}
