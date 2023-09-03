import { hydrateRoot } from "react-dom/client";
// import Home  from "@/pages/Home";
import routes from "@/router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { clientStore } from "@/store";

const Client = (): JSX.Element => {
  return <Provider store={clientStore}>
    <BrowserRouter>
      <Routes>
        {routes?.map((item, index) => {
          return <Route {...item} key={index} />;
        })}
      </Routes>
    </BrowserRouter>
  </Provider>
}

// hydrateRoot(document.getElementById('root') as Document | Element, <Home />);
hydrateRoot(document.getElementById('root') as Document | Element, <Client />);