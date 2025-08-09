import { act, render } from '@testing-library/react';
import {
  getLatestObserverInstance,
  setupMockIntersectionObserver,
} from '../../../test-utils/interceptor.test-helper';
import { useInfiniteScroll } from './useInfiniteScroll';

setupMockIntersectionObserver();

const TestComponent = ({ onIntersect }: { onIntersect: () => void }) => {
  const loaderRef = useInfiniteScroll(onIntersect);
  return <div data-testid="loader" ref={loaderRef} />;
};

const NoLoaderComponent = ({ onIntersect }: { onIntersect: () => void }) => {
  useInfiniteScroll(onIntersect);
  return <span data-testid="nothing" />;
};

describe('useInfiniteScroll', () => {
  test('should call a callback when loader enter to the view', () => {
    const callback = jest.fn();
    render(<TestComponent onIntersect={callback} />);

    const instance = getLatestObserverInstance();
    expect(instance.observe).toHaveBeenCalledWith(expect.any(HTMLDivElement));

    act(() => {
      instance.triggerIntersect([{ isIntersecting: true }]);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call a callback when it is not intercept', () => {
    const callback = jest.fn();
    render(<TestComponent onIntersect={callback} />);

    const instance = getLatestObserverInstance();

    act(() => {
      instance.triggerIntersect([{ isIntersecting: false }]);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should not created an observer if does not exists loaderRef', () => {
    render(<div data-testid="dummy" />);
    expect(() => getLatestObserverInstance()).toThrow(
      'No IntersectionObserver instance was created'
    );
  });

  test('should not create an observer if never load and assign the ref', () => {
    const callback = jest.fn();
    render(<NoLoaderComponent onIntersect={callback} />);

    expect(() => getLatestObserverInstance()).toThrow(
      'No IntersectionObserver instance was created'
    );
  });
});
