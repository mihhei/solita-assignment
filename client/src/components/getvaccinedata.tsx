import React, { useEffect, useState } from "react";
import { ShowOrdersToDate } from "./showorderstodate";
import { ShowExpiredBottles } from "./showexpiredbottles";
import { ShowUsedAndExpiredVaccine } from "./showusedandexpiredvaccine";

export const GetVaccineData: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
    const instance = M.FormSelect.getInstance(elems[0]);
    setSelected(instance.getSelectedValues());
  }, []);

  return (
    <div className="container">
      <div className="input-field col s12">
        <select
          id="sel"
          onChange={(event) => {
            event.preventDefault();
            setSelected([event.target.value]);
          }}
          defaultValue=""
        >
          <option value="">Choose your option</option>
          <option value="showOrders">Get all orders FROM/TO date</option>
          <option value="expiredBottles">Get expired bottles on TO date</option>
          <option value="usedAndExpiredVaccine">
            Get number of expired vaccine before usage
          </option>
        </select>
        <label>Choose your option</label>
      </div>
      {selected[0] === "showOrders" && <ShowOrdersToDate />}
      {selected[0] === "expiredBottles" && <ShowExpiredBottles />}
      {selected[0] === "usedAndExpiredVaccine" && <ShowUsedAndExpiredVaccine />}
    </div>
  );
};
