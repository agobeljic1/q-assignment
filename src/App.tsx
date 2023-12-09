import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Header from "./ui/components/Header";
import withLogging from "./hocs/loggerHoc";

const Page = css`
  padding: 1rem;
`;

function App() {
  return (
    <>
      <Header />
      <main css={Page}>
        <Outlet />
      </main>
    </>
  );
}

export default withLogging(App, App.name);
