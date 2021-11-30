import { render, screen, act } from "@testing-library/react";
import Home from "./Home";
import store, { persistor } from "../../apps/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "../../apps/apollo-client";

const Wrapper = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={["/"]}>
            <Home />
          </MemoryRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

// test("component carousel have image 1", () => {
//   const { getByTestId } = render(<Wrapper />);
//   //   const scrollToSpy = jest.fn();
//   //   window.scrollTo = scrollToSpy;
//   const img = getByTestId("corousel1");

//   expect(img).toBeInTheDocument();
// });
// test("component have Image avatar", () => {
//   render(<Wrapper />);

//   const img = screen.getByAltText(/First slide/);

//   expect(img).toBeInTheDocument();
// });

test("pokemon list have 2 elements", async () => {
  await act(async () => render(<Wrapper />));

  const pokemons = await screen.findAllByTestId("corousel1");
  expect(pokemons).toBeInTheDocument();
});
