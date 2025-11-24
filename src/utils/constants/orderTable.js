import { Link } from "react-router-dom";
import Delete from "../../components/orders/Delete";
import Select from "../../components/orders/Select";
import { checkInOrderType, priceProductSeparate } from "../helpers/general";

export const OrdersTableHeaderTitle = [
  {
    Header: "ФИО",
    accessor: "fullName",
    style: {
      flex: 1.5,
    },
    Cell: ({ row }) => (
      <div title="Перейти к оплате">
        <Link to={String(row.original.id)}>
          {row.original.fullName || "Don't have"}
        </Link>
      </div>
    ),
  },
  {
    Header: "Номер/дата",
    accessor: "requestNumber",
    style: {
      flex: 1.2,
    },
    Cell: ({ row }) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ color: "#2C68F5" }}>
          {priceProductSeparate(Number(row.original.requestNumber || 0))}
        </p>
        <p style={{ color: "#909CB5" }}>{row.original.time || "—"}</p>
      </div>
    ),
  },
  {
    Header: "Кол-во",
    accessor: "count",
    Cell: ({ row }) => (
      <div style={{ display: "flex", gap: "5px" }}>
        <span>{priceProductSeparate(Number(row.original.count || 0))}</span>
        <span>шт.</span>
      </div>
    ),
  },
  {
    Header: "Общая сумма",
    accessor: "totalPrice",
    style: {
      flex: 1.5,
    },
    Cell: ({ row }) => (
      <div>{priceProductSeparate(Number(row.original.totalPrice || 0))} c</div>
    ),
  },
  {
    Header: "Оформление заказа",
    accessor: "receivingMethod",
    style: {
      flex: 2,
    },
    Cell: ({ row }) => (
      <div>
        {checkInOrderType(row.original.receivingMethod || "Don't have")}
      </div>
    ),
  },
  {
    Header: "Статус",
    accessor: "status",
    style: {
      flex: 1.4,
    },
    Cell: ({ row }) => <Select {...row.original} />,
  },
  {
    Header: "Действия",
    accessor: "id",
    Cell: ({ row }) => <Delete {...row.original} />,
  },
];
