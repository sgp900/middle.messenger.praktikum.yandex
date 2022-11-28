export default class EventBus<E extends { [Ev: string]: unknown[] }> {
  private readonly listeners: {
    // eslint-disable-next-line no-unused-vars
    [K in keyof E]?: Array<(...args: E[K]) => void>;
  } = {};

  // eslint-disable-next-line no-unused-vars
  on<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  // eslint-disable-next-line no-unused-vars
  off<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event as string}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  emit<K extends keyof E>(event: K, ...args: E[K]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event as string}`);
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}
