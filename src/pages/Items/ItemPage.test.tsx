import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import ItemsPage from "./ItemsPage";
import { store } from "../../redux/store";

test("renders app", () => {
  const { getByText } = render(
    <Provider store={store}>
      <ItemsPage />
    </Provider>
  );

  expect(getByText(/Filters/i)).toBeInTheDocument();
  expect(getByText(/Basket/i)).toBeInTheDocument();
});
