import {
  styled,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
} from "@mui/material";
import { default as MUITable } from "@mui/material/Table";
import { useMemo } from "react";
import { useTable } from "react-table";
import SortContent from "./goods-cmp/sort";

const defaultColumnProps = {
  style: {
    minWidth: 15,
    flex: 1,
  },
};

const Table = ({
  tableHeaderTitle,
  data,
  isMarked,
  found,
  countOfOrders,
  onChange,
  selectedItem = [],
  isSort = false,
}) => {
  const columns = useMemo(() => tableHeaderTitle, []);
  const dataTable = data || [];

  const tableHooks = (hooks) => {
    if (isMarked === true) {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            Header: "ID",
            accessor: "id",
            style: {
              flex: 0.3,
            },
            Cell: ({ row }) => {
              return (
                <>
                  <div className="checkbox">
                    <Checkbox
                      color="secondary"
                      onClick={() => onChange(row.original.id)}
                    />
                  </div>
                  <div className="ID">{row.index + 1}</div>
                </>
              );
            },
          },
          ...columns,
        ];
      });
    } else if (isMarked === false) {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            Header: "ID",
            accessor: "id",
            style: {
              flex: 0.3,
            },
            Cell: ({ row }) => {
              return <div>{row.index + 1}</div>;
            },
          },
          ...columns,
        ];
      });
    }
    if (isMarked === null) {
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: dataTable,
        defaultColumn: defaultColumnProps,
      },
      tableHooks
    );

  return (
    <MainContainer marked={String(isMarked)}>
      {found ? (
        <Box className="align-end between">
          <Typography className="foundOrderText title">
            Найдено {countOfOrders} заказов
          </Typography>
          {isSort && <SortContent />}
        </Box>
      ) : null}

      <MUITable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps({
                style: {
                  display: "flex",
                  width: "100%",
                },
              })}
              key={i}
            >
              {headerGroup.headers.map((column, i) => (
                <TableCell
                  {...column.getHeaderProps({
                    style: { ...column.style },
                  })}
                  key={i}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <StyledTableRow
                {...row.getRowProps({
                  style: { display: "flex" },
                })}
                key={i}
                checked={isMarked}
                $isSelected={selectedItem.includes(row.original.id)}
              >
                {row.cells.map((cell, i) => (
                  <TableCell
                    {...cell.getCellProps({
                      style: {
                        ...cell.column.style,
                        ...cell.column.tdStyle,
                      },
                    })}
                    key={i}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </MUITable>
    </MainContainer>
  );
};

export default Table;

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "$isSelected" && prop !== "checked",
})(({ theme, $isSelected, checked }) => ({
  padding: "20px",
  border: `1px solid ${theme.palette.grey[600]}`,
  borderRadius: "6px",

  // 🔥 Фиолетовая граница только если оба условия true:
  ...(checked &&
    $isSelected && {
      border: `1px solid ${theme.palette.secondary.main}`,
    }),

  "& .checkbox": { display: "none" },

  "&:hover": {
    background: checked ? "rgba(144, 156, 181, 0.2)" : "",

    "& .ID": { display: "none" },

    "& .checkbox": {
      display: "block",
      padding: "0 0 15px 0",
      "& .MuiCheckbox-root": { padding: 0 },
    },
  },
}));

const MainContainer = styled(TableContainer)(({ theme, marked }) => ({
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "14px",
  color: theme.palette.primary.light,

  "& .title": {
    padding: "40px 0 16px",
  },

  "& .MuiTable-root": {
    "& .MuiTableHead-root": {
      backgroundColor: theme.palette.primary.light,
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      margin: "0 0 10px",

      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          color: theme.palette.primary.contrastText,
          fontWeight: "600",
          border: "none",
          padding: "0",
        },
      },
    },

    "& .MuiTableBody-root": {
      display: "grid",
      gap: "8px",

      "& .MuiTableRow-root": {
        padding: marked === "null" ? 0 : "",
        "& .MuiTableCell-root": {
          border: "none",
          padding: "0",
        },
      },
    },
  },
}));
