import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { Context } from "./context";
import { DataList } from "./datalist";
import { Total } from "./total";
import { Loader } from "./loader";

interface DataFromServer {
  usedVaccine: number;
  expiredVaccine: number;
}

export const ShowUsedAndExpiredVaccine: React.FC = () => {
  const [mainState] = useContext(Context);

  const [data, setData] = useState<DataFromServer>({
    usedVaccine: 0,
    expiredVaccine: 0,
  });
  const { request, loading } = useHttp();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const fetch = await request(
          "/api/vaccine/orders/expiredandused",
          "POST",
          {
            state: mainState,
          }
        );
        console.log(fetch);
        setData(fetch);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingData();
  }, [request, mainState]);
  if (loading) {
    return <Loader />;
  } else
    return (
      <>
        <div className="dateField">
          Number of expired vaccine total {data.expiredVaccine}
        </div>
      </>
    );
};
