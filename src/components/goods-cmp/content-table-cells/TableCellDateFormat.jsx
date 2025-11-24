import { Box, styled, Typography } from "@mui/material";
import { format } from "date-fns";

const TableCellDateFormat = ({ date }) => {
  const dateFormat = format(new Date(date), "dd.MM.yyyy");
  const dateHourFormat = format(new Date(date), "hh:mm");

  return (
    <StyledTableCellDateFormat className="flex-start column">
      <Typography classes={{ root: "date" }} variant="body1">
        {dateFormat}
      </Typography>

      <Typography
        classes={{ root: "date" }}
        variant="body2"
        style={{ color: "#909CB5" }}
      >
        {dateHourFormat}
      </Typography>
    </StyledTableCellDateFormat>
  );
};

export default TableCellDateFormat;

const StyledTableCellDateFormat = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "5px 0",
  "& .date": {
    padding: 0,
  },
}));
