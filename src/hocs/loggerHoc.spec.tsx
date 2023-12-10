import { render } from "@testing-library/react";
import withLogging from "./loggerHoc";

describe("loggerHoc", () => {
  it("should log default message on mount", async () => {
    const WrappedComponent = () => <div>Wrapped component</div>;
    const componentName = "TestComponent";

    const ComponentWithLogging = withLogging(WrappedComponent, componentName);
    const consoleSpy = vi.spyOn(console, "log");

    render(<ComponentWithLogging />);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(`Hello from ${componentName}`);
  });

  it("should log custom message on mount", async () => {
    const WrappedComponent = () => <div>Wrapped component</div>;
    const componentName = "TestComponent";
    const customLogMessage = "Custom message";

    const ComponentWithLogging = withLogging(
      WrappedComponent,
      componentName,
      customLogMessage
    );

    const consoleSpy = vi.spyOn(console, "log");

    render(<ComponentWithLogging />);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      `${customLogMessage} ${componentName}`
    );
  });
});
