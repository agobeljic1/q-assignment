import React from "react";

const withLogging = (
  WrappedComponent: any,
  componentName: string,
  logMessage: string = "Hello from"
) => {
  const LogWrapper = (props: any) => {
    React.useEffect(() => {
      console.log(`${logMessage} ${componentName}`);
    }, [logMessage, componentName]);

    return <WrappedComponent {...props} />;
  };

  return LogWrapper;
};

export default withLogging;
