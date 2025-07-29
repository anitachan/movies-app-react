export const observe = jest.fn();
export const unobserve = jest.fn();
export const disconnect = jest.fn();

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  public callback: IntersectionObserverCallback;
  public options?: IntersectionObserverInit;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;

  triggerIntersect(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

export function setupMockIntersectionObserver() {
  beforeAll(() => {
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  beforeEach(() => {
    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
    MockIntersectionObserver.instances = [];
  });
}

export function getLatestObserverInstance(): MockIntersectionObserver {
  if (MockIntersectionObserver.instances.length === 0) {
    throw new Error('No IntersectionObserver instance was created');
  }
  return MockIntersectionObserver.instances.at(-1)!;
}
