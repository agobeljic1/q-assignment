import { render, screen, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

const DELAY = 300;
const INITIAL_VALUE = "initial";
const UPDATED_VALUE = "updated";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("should debounce the value after a specific delay", async () => {
    const TestComponent = ({ value }: { value: string }) => {
      const debouncedValue = useDebounce(value, DELAY);

      return <div data-testid="result">{debouncedValue}</div>;
    };

    const { rerender } = render(<TestComponent value={INITIAL_VALUE} />);
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);

    act(() => {
      rerender(<TestComponent value={UPDATED_VALUE} />);
    });
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("result").textContent).toEqual(UPDATED_VALUE);
  });

  test("clears the timeout on unmount", () => {
    const TestComponent = ({ value }: { value: string }) => {
      const debouncedValue = useDebounce(value, DELAY);

      return <div data-testid="result">{debouncedValue}</div>;
    };
    const spyClearTimeout = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<TestComponent value={INITIAL_VALUE} />);
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);
    unmount();
    expect(spyClearTimeout).toBeCalledTimes(1);
  });

  test("clears the timeout on value change", () => {
    const TestComponent = ({ value }: { value: string }) => {
      const debouncedValue = useDebounce(value, DELAY);

      return <div data-testid="result">{debouncedValue}</div>;
    };
    const spyClearTimeout = vi.spyOn(window, "clearTimeout");
    const { rerender } = render(<TestComponent value={INITIAL_VALUE} />);
    expect(screen.getByTestId("result").textContent).toEqual(INITIAL_VALUE);
    act(() => {
      rerender(<TestComponent value={UPDATED_VALUE} />);
    });
    expect(spyClearTimeout).toBeCalledTimes(1);
  });
});
