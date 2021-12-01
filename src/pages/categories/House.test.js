import { render, screen, act } from "@testing-library/react";
import House from "./House";
import store, { persistor } from "../../apps/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { QUERY } from "./House";

const mocks = [
  {
    request: {
      query: QUERY,
      variables: {},
    },
    result: {
      data: {
        properties: [
          {
            price: 999999999,
            name: "rumahku",
            img: "https://images.unsplash.com/photo-1581279813180-4dddc1008167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            id: 1,
            description: "rumah aman dan keren modern",
            category_id: 1,
            category: {
              id: 1,
              name: "House",
            },
          },
          {
            price: 1999999999,
            name: "apartemenku",
            img: "https://images.unsplash.com/photo-1581279813180-4dddc1008167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            id: 1,
            description: "rumah aman dan keren modern",
            category_id: 2,
            category: {
              id: 2,
              name: "Apartement",
            },
          },
        ],
      },
    },
  },
];
const Wrapper = () => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MemoryRouter initialEntries={["/categories/house"]}>
            <House />
          </MemoryRouter>
        </PersistGate>
      </Provider>
    </MockedProvider>
  );
};

test("Title House page", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByTestId("title");
  expect(text).toBeInTheDocument();
});

test("Card component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByTestId("card");
  expect(text).toBeInTheDocument();
});

test("Card name house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/rumahku/);
  expect(text).toBeInTheDocument();
});

test("Card price house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Rp 999.999.999/);
  expect(text).toBeInTheDocument();
});

test("Card iamge house component", async () => {
  await act(async () => render(<Wrapper />));

  const img = await screen.findByAltText("cardImg");
  expect(img).toBeInTheDocument();
});

test("Card category house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/House/);
  expect(text).toBeInTheDocument();
});
