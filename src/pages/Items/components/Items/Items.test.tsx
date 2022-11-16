import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.

import Items from "./index";
import { renderWithProviders } from "../../../../utils/test-utils";

// We use msw to intercept the network request during the test,
export const handlers = [
  rest.get(
    "https://getir-fe-assignment-db.vercel.app/items",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            tags: ["Trees"],
            price: 10.99,
            name: "Handcrafted Trees Shirt",
            description:
              "enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur",
            slug: "Handcrafted-Trees-Shirt",
            added: 1485723766805,
            manufacturer: "OHara-Group",
            itemType: "shirt",
          },
          {
            tags: ["Beach", "Ocean", "Water"],
            price: 19.99,
            name: "Rustic Beach Mug",
            description:
              "totam at veritatis eligendi assumenda ex quia praesentium quibusdam ducimus",
            slug: "Rustic-Beach-Mug",
            added: 1481573896833,
            manufacturer: "Sipes-Inc",
            itemType: "mug",
          },
        ]),
        ctx.delay(250)
      );
    }
  ),
];

const server = setupServer(...handlers);

const thunkMiddleware =
  ({ dispatch, getState }: any) =>
  (next: any) =>
  (action: any) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe("Items", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  beforeEach(() => renderWithProviders(<Items />));

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should fetche & receives a items while loading", async () => {
    // should show no items initially, and not be fetching  items
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Handcrafted Trees Shirt/i)
    ).not.toBeInTheDocument();

    // after some time, the items should be received
    expect(
      await screen.findByText(/Handcrafted Trees Shirt/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Rustic Beach Mug/i)).toBeInTheDocument();
  });

  it("should filters by item type", async () => {
    fireEvent.click(screen.getByRole("button", { name: /mug/i }));

    const { next, invoke } = create();
    const filterMug = { type: "filter/filterByItemType", payload: "mug" };
    invoke(filterMug);
    expect(next).toHaveBeenCalledWith(filterMug);

    expect(
      screen.queryByText(/Handcrafted Trees Shirt/i)
    ).not.toBeInTheDocument();
    expect(await screen.findByText(/Rustic Beach Mug/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /mug/i }));

    const filterShirt = { type: "filter/filterByItemType", payload: "shirt" };
    invoke(filterShirt);
    expect(next).toHaveBeenCalledWith(filterShirt);

    expect(screen.queryByText(/Rustic Beach Mug/i)).not.toBeInTheDocument();
    expect(
      await screen.findByText(/Handcrafted Trees Shirt/i)
    ).toBeInTheDocument();
  });
});
