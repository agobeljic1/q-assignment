import { Outlet } from "react-router-dom";
import Header from "./ui/components/Header";
import { css } from "@emotion/react";

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

export default App;
