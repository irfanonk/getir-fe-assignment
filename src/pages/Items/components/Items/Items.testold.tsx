import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Items from "./index";
import { store } from "../../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
// import { testUseAppSelector } from "../../../../redux/test-app-selector";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../redux/hooks");

// describe("Items", () => {
//   const mockDispatch = jest.fn();
//   beforeEach(() => {
//     (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
//     (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
//     render(
//       <Provider store={store}>
//         <Items />
//       </Provider>
//     );
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders items", () => {
//     expect(screen.getByText(/Products/i)).toBeInTheDocument();
//   });
//   it("should filter by item type", () => {
//     const mugBtn = screen.getByText("mug");
//     // console.log("mugBtn", mugBtn);
//     userEvent.click(mugBtn);

//     expect(useAppDispatch).toHaveBeenCalled();
//     expect(mockDispatch).toHaveBeenCalledWith({
//       type: "filter/filterByItemType",
//       payload: "mug",
//     });
//   });
// });

test("renders app", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Items />
    </Provider>
  );

  expect(getByText(/Products/i)).toBeInTheDocument();
});
