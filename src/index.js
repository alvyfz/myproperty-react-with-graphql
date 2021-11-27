import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Routing from "./pages/Routing";
import store, { persistor } from "./apps/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import client from "./apps/apollo-client";
import "aos/dist/aos.css";
import "swiper/swiper.min.css";
// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// // modules styles
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// // import "swiper/swiper.scss";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
