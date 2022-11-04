import { useEffect, useState } from "react";
import { getItems, selectItems } from "../../features/items/itemSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

export default function Items() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  console.log("items", items);

  useEffect(() => {
    dispatch(getItems(16));
  }, []);

  if (items.status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {items.value?.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}
