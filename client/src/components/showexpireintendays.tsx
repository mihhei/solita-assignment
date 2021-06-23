import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { Context } from "./context";
import { DataList } from "./datalist";
import { Total } from "./total";
import { Loader } from "./loader";

interface DataFromServer {
  message: string;
  usedVaccine: number;
  expiredVaccine: number;
}

export const ShowExpireInTenDays: React.FC = () => {
  const [mainState] = useContext(Context);

  const [data, setData] = useState<DataFromServer>({
    message: "",
    usedVaccine: 0,
    expiredVaccine: 0,
  });
  const { request, loading } = useHttp();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const fetch = await request(
          "/api/vaccine/orders/expiretendays",
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
  } else if (data.message === "") {
    return (
      <div className="dateField">
        Number of vaccines that expire in next ten days {data.expiredVaccine}
      </div>
    );
  } else {
    return <div className="dateField">{data.message}</div>;
  }
};
