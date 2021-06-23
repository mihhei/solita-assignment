import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { Context } from "./context";
import { DataList } from "./datalist";

interface DataFromServer {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: string;
  vaccine: string;
  injections: number;
  arrived: string;
}

export const ShowExpiredBottles: React.FC = () => {
  const [mainState] = useContext(Context);

  const [data, setData] = useState<[DataFromServer]>([
    {
      id: "",
      orderNumber: 0,
      responsiblePerson: "",
      healthCareDistrict: "",
      vaccine: "",
      injections: 0,
      arrived: "",
    },
  ]);
  const { request } = useHttp();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const fetch = await request("/api/vaccine/orders/expired", "POST", {
          state: mainState,
        });
        setData(fetch);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingData();
  }, [request, mainState]);

  if (data[0].arrived === "select") {
    return <div>Between dates FROM and TO must be more then 30 days!</div>;
  } else if (data[0].vaccine === "select") {
    return <div>Choose any vaccine!</div>;
  }
  return <DataList source={data} />;
};
