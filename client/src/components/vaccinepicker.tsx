import React, { useContext } from "react";
import { Context } from "./context";

export const VaccinePicker: React.FC = () => {
  const [mainState, setMain] = useContext(Context);

  const selectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectName = event.target.name;
    switch (selectName) {
      case "selectAntiqua":
        setMain((prev) => ({ ...prev, selectAntiqua: !prev.selectAntiqua }));
        break;
      case "selectSolar":
        setMain((prev) => ({ ...prev, selectSolar: !prev.selectSolar }));
        break;
      case "selectZerpfy":
        setMain((prev) => ({ ...prev, selectZerpfy: !prev.selectZerpfy }));
        break;
      default:
        setMain((prev) => ({
          ...prev,
          selectAntiqua: true,
          selectZerpfy: true,
          selectSolar: true,
        }));
    }
  };

  return (
    <>
      <div className="dateField">
        <div className="row">
          <div className="col s4">
            <label>
              <input
                name="selectAntiqua"
                type="checkbox"
                checked={mainState.selectAntiqua}
                className="filled-in"
                onChange={(event) => selectHandler(event)}
              />
              <span>Antiqua</span>
            </label>
          </div>

          <div className="col s4">
            <label>
              <input
                name="selectSolar"
                type="checkbox"
                className="filled-in"
                checked={mainState.selectSolar}
                onChange={(event) => selectHandler(event)}
              />
              <span>SolarBuddhica</span>
            </label>
          </div>

          <div className="col s4">
            <label>
              <input
                name="selectZerpfy"
                type="checkbox"
                checked={mainState.selectZerpfy}
                className="filled-in"
                onChange={(event) => selectHandler(event)}
              />
              <span>Zerpfy</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
