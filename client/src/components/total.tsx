import React, { useEffect, useState } from "react";

interface DataFromServer {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: string;
  vaccine: string;
  injections: number;
  arrived: string;
}
interface TotalData {
  totalOrder: number;
  totalVaccine: number;
}
type DataListProps = {
  onClick: () => void;
  source: [DataFromServer];
};

export const Total: React.FC<DataListProps> = ({ source, onClick }) => {
  const [total, setTotal] = useState<TotalData>({
    totalOrder: 0,
    totalVaccine: 0,
  });
  useEffect(() => {
    let totalOrder = source[0].id === "" ? 0 : source.length;
    let totalVaccine = 0;
    source.forEach((item: DataFromServer) => {
      totalVaccine += item.injections;
    });
    setTotal({
      totalOrder,
      totalVaccine,
    });
  }, [source]);
  return (
    <div className="dateField" onClick={onClick}>
      Total orders {total.totalOrder} Total vaccine {total.totalVaccine}
    </div>
  );
};
