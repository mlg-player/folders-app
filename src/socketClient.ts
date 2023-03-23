import { io, Socket } from "socket.io-client";
const contr = require("lodash-contrib");

class socketClient {
  #connection: boolean;
  #baseURL: string;
  #socket: Socket<any, any>;
  #channels: string[];
  #listeners: {
    [event: string]: {
      event: string;
      callback: any[];
    };
  };
  #listenerChannels: {
    [channel: string]: {
      event: string;
      callback: any;
    };
  };

  constructor() {
    this.#connection = false;
    this.#baseURL = document.location.port?.length > 0 ? document.location.href.replace(
      document.location.port,
      `${3000}`
      ) : `https://r18.ksixen.xyz`;

    this.#socket = io(this.#baseURL, {
      auth: {
        token: "123",
      },
      reconnectionDelay: 10000,
      transports: ["websocket"],
    });
    this.#channels = [];
    this.#listenerChannels = {};
    this.#listeners = {};
  }

  channels(channels: string[]) {
    this.#channels = channels;
    return this;
  }
  listener(event: string, callback: any) {
    if (this.#listeners[event]) {
      this.#listeners[event].callback.push(callback);
    } else this.#listeners[event] = { event: event, callback: [callback] };

    this.#socket.removeAllListeners();

    this.#channels.forEach((channel) => {
      this.#socket.on(channel, (...args: any) => {
        this.event(channel, args);
      });
    });

    return this;
  }

  event(channel: string, args: any) {
    args = args.map((event: any) => {
      return contr.isJSON(event) ? JSON.parse(event) : event;
    });
    console.groupCollapsed("Socket event: " + channel);
    console.log(...args);
    console.groupEnd();
    args.forEach((arg: any) => {
      try {
        if (this.#listeners[arg.event]) {
          this.#listeners[arg.event].callback.forEach(async (call) =>
            call(arg.data)
          );
        }
      } catch (e) {
        console.groupCollapsed("Socket event error: " + channel);
        console.log(...args);
        console.log(e);
        console.groupEnd();
      }
    });

    try {
      if (this.#listenerChannels[channel]) {
        this.#listenerChannels[channel].callback(args);
      }
    } catch (e) {
      console.groupCollapsed("Socket event error: " + channel);
      console.log(...args);
      console.log(e);
      console.groupEnd();
    }
  }
  channelListener(channel: string, callback: any) {
    this.#listenerChannels[channel] = { event: channel, callback: callback };
    this.#socket.removeAllListeners();

    this.#channels.forEach((channel) => {
      this.#socket.on(channel, (...args: any) => {
        this.event(channel, args);
      });
    });

    return this;
  }

  open() {
    this.#socket.connect();
    return this;
  }

  emit(channel: string, data: any) {
    this.#socket.emit(channel, data);
    return this;
  }

  close() {
    this.#socket.disconnect();
    return this;
  }
}

export default socketClient;
