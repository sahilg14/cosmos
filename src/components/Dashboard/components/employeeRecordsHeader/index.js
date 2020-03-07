import "date-fns";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import "../employeeRecords/styles.css";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class EmployeeRecordsHeader extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell
            className="borderRightWhite"
            align="center"
            rowSpan={2}
          >
            Date{" "}
          </StyledTableCell>
          <StyledTableCell
            className="borderRightWhite"
            align="center"
            colSpan={2}
          >
            Signature (YES)
          </StyledTableCell>
          <StyledTableCell
            className="borderRightWhite"
            align="center"
            colSpan={2}
          >
            Signature (NO)
          </StyledTableCell>
          <StyledTableCell align="center" colSpan={2}>
            TOTAL
          </StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell align="center">Packages</StyledTableCell>
          <StyledTableCell className="borderRightWhite" align="center">
            Amount
          </StyledTableCell>
          <StyledTableCell align="center">Packages</StyledTableCell>
          <StyledTableCell className="borderRightWhite" align="center">
            Amount
          </StyledTableCell>
          <StyledTableCell align="center">Packages</StyledTableCell>
          <StyledTableCell align="center">Amount</StyledTableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default EmployeeRecordsHeader;
