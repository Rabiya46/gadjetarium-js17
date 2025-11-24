import TableCellCount from "../../components/goods-cmp/content-table-cells/TableCellCount";
import TableCellCurrentPrice from "../../components/goods-cmp/content-table-cells/TableCellCurrentPrice";
import TableCellDateFormat from "../../components/goods-cmp/content-table-cells/TableCellDateFormat";
import TableCellEditAndDelete from "../../components/goods-cmp/content-table-cells/TableCellEditAndDelete";
import TableCellImage from "../../components/goods-cmp/content-table-cells/TableCellImage";
import TableCellPriceAndDiscount from "../../components/goods-cmp/content-table-cells/TableCellPriceAndDiscount";
import TableCellProductCount from "../../components/goods-cmp/content-table-cells/TableCellProductCount";
import TableCellVendorCode from "../../components/goods-cmp/content-table-cells/TableCellVendorCode";

export const tableHeader = [
  {
    Header: "Фото",
    accessor: "photo",
    style: {
      flex: 0.5,
    },
    Cell: ({ row }) => {
      return <TableCellImage {...row.original} />;
    },
  },
  {
    Header: "Артикул",
    accessor: "article",
    style: {
      flex: 0.5,
    },
    Cell: ({ row }) => {
      return <TableCellVendorCode {...row.original} />;
    },
  },
  {
    Header: "Наименование товара",
    accessor: "count",
    style: {
      flex: 1,
    },
    Cell: ({ row }) => {
      return <TableCellProductCount {...row.original} />;
    },
  },
  {
    Header: "Дата создания",
    accessor: "date",
    style: {
      flex: 0.8,
    },
    Cell: ({ row }) => {
      return <TableCellDateFormat {...row.original} />;
    },
  },
  {
    Header: "Кол-во",
    accessor: "discount",
    style: {
      flex: 0.5,
    },
    Cell: ({ row }) => {
      return <TableCellCount {...row.original} />;
    },
  },
  {
    Header: "Цена товара",
    accessor: "price",
    style: {
      flex: 0.7,
    },
    Cell: ({ row }) => {
      return <TableCellPriceAndDiscount {...row.original} />;
    },
  },
  {
    Header: "Текущая цена",
    accessor: "priceAfterDiscount",
    style: {
      flex: 0.7,
    },
    Cell: ({ row }) => {
      return <TableCellCurrentPrice {...row.original} />;
    },
  },
  {
    Header: "Действия",
    accessor: "",
    style: {
      flex: 0.5,
    },
    Cell: ({ row }) => {
      return <TableCellEditAndDelete {...row.original} />;
    },
  },
];
