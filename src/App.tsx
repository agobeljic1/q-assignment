import { Outlet } from "react-router-dom";
import Header from "./ui/components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="Page">
        <Outlet />
      </main>
    </>
  );
}

export default App;
