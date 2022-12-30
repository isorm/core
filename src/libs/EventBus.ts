import { EventBusNS } from "../types";

class EventBus {
  private declare router: EventBusNS.Router;
  private static instance: EventBus;
  private declare eventId: number;

  constructor() {
    this.router = new Map();
    this.eventId = 0;
  }

  private static clone() {
    if (!this.instance) this.instance = new EventBus();
    return this.instance;
  }

  private incEventId() {
    return this.eventId++;
  }

  static getRoute(routeKey: string) {
    return this.instance.router.get(routeKey);
  }

  static publish<T>(event: string, routeKey: string, data: T) {
    EventBus.clone();

    const routes = EventBus.getRoute(routeKey) || {};

    const pubId = Math.round(Math.random() * 999999999);

    routes[event].slice(-1)[0].pubId = pubId;

    this.instance.router.set(routeKey, routes);
    const route = this.instance.router?.get(routeKey)!;

    const routeKeys = Object.keys(route);

    if (!routeKeys.includes(event)) return;

    const key = routeKeys.filter((key) => key === event)[0];

    const sub = route[key].findIndex((item) => item.pubId === pubId);

    return route[key][sub].fn(data);
  }

  static subscribe<T>(
    event: string,
    routeKey: string,
    callback: (data: T) => any,
  ) {
    EventBus.clone();

    const id = this.instance.incEventId();
    const route = EventBus.getRoute(routeKey) || {};
    if (!route[event]) route[event] = [];

    route[event][id] = {
      ...route[event][id],
      fn: callback,
    };

    this.instance.router.set(routeKey, route);

    return {
      unSubscribe: () => {
        const route = EventBus.getRoute(routeKey) || {};

        route[event] = route[event].filter((fn, i) => i !== id);

        this.instance.router.set(routeKey, route);
      },
    };
  }
}

export default EventBus;
