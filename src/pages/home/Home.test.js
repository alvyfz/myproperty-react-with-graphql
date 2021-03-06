import { render, screen, act } from "@testing-library/react";
import Home from "./Home";
import store, { persistor } from "../../apps/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { QUERY_PROPERTIES } from "./Home";

const mocks = [
  {
    request: {
      query: QUERY_PROPERTIES,
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
          <MemoryRouter initialEntries={["/"]}>
            <Home />
          </MemoryRouter>
        </PersistGate>
      </Provider>
    </MockedProvider>
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

test("image carousel 1", async () => {
  await act(async () => render(<Wrapper />));

  const img = await screen.findByTestId("corousel1");
  expect(img).toBeInTheDocument();
});
test("caption carousel 1", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Discover Design of/);
  expect(text).toBeInTheDocument();
});

test("image carousel 2", async () => {
  await act(async () => render(<Wrapper />));

  const img = await screen.findByTestId("corousel2");
  expect(img).toBeInTheDocument();
});
test("caption carousel 2", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Discover Property in/);
  expect(text).toBeInTheDocument();
});

test("image carousel 3", async () => {
  await act(async () => render(<Wrapper />));

  const img = await screen.findByTestId("corousel3");
  expect(img).toBeInTheDocument();
});
test("caption carousel 3", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Trending Properties Near/);
  expect(text).toBeInTheDocument();
});

test("Title list card apartement", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/FEATURED APARTEMENT/);
  expect(text).toBeInTheDocument();
});

test("Card apartement component", async () => {
  await act(async () => render(<Wrapper />));

  const card = await screen.findByTestId("cardApartment");
  expect(card).toBeInTheDocument();
});

test("Card name apartement component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/apartemenku/);
  expect(text).toBeInTheDocument();
});

test("Card price apartement component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Rp 999.999.999/);
  expect(text).toBeInTheDocument();
});
test("Title list card house", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/LATEST ARRIVALS/);
  expect(text).toBeInTheDocument();
});

test("Card house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByTestId("cardHouse");
  expect(text).toBeInTheDocument();
});

test("Card name house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/rumah/);
  expect(text).toBeInTheDocument();
});

test("Card price house component", async () => {
  await act(async () => render(<Wrapper />));

  const text = await screen.findByText(/Rp 1.999.999.999/);
  expect(text).toBeInTheDocument();
});
