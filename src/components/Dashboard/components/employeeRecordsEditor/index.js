import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import EmployeeRecordsHeader from "../employeeRecordsHeader";

import { startOfWeek, eachDayOfInterval, addDays } from "date-fns";

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
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

class EmployeeRecordsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      startOfWeek: startOfWeek(new Date(), {
        weekStartsOn: 1
      })
    };
  }

  handleDateChange = date => {
    this.setState({
      selectedDate: date,
      startOfWeek: startOfWeek(date, {
        weekStartsOn: 1
      })
    });
  };
  render() {
    return (
      <Grid>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <EmployeeRecordsHeader />
            <TableBody>
              {eachDayOfInterval({
                start: this.state.startOfWeek,
                end: addDays(this.state.startOfWeek, 6)
              }).map((p, idx) => {
                return (
                  <StyledTableRow className="recordInputs" key={idx}>
                    <StyledTableCell>
                      <TextField
                        className="extraWidth"
                        id={`date-${idx}`}
                        value={p.toDateString()}
                        InputLabelProps={{ shrink: true }}
                        label=""
                        variant="filled"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        id={`packagesSign-${idx}`}
                        value={"10"}
                        InputLabelProps={{ shrink: true }}
                        label="Packages"
                        variant="outlined"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        id={`amountSign-${idx}`}
                        value={""}
                        InputLabelProps={{ shrink: true }}
                        label="Amount"
                        variant="outlined"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        id={`packagesNoSign-${idx}`}
                        value={""}
                        InputLabelProps={{ shrink: true }}
                        label="Packages"
                        variant="outlined"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        id={`amountNoSign-${idx}`}
                        value={""}
                        InputLabelProps={{ shrink: true }}
                        label="Amount"
                        variant="outlined"
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>Total 20</StyledTableCell>
                    <StyledTableCell>Total 30</StyledTableCell>
                  </StyledTableRow>
                );
              })}
              <StyledTableRow className="recordInputs">
                <StyledTableCell colSpan={5} align="right">
                  TOTAL
                </StyledTableCell>
                <StyledTableCell align="center">90</StyledTableCell>
                <StyledTableCell align="center">35</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow className="recordInputs">
                <StyledTableCell colSpan={4} align="right">
                  ZONE 2
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`amountNoSign`}
                    value={"0.5"}
                    InputLabelProps={{ shrink: true }}
                    label="Rate"
                    variant="outlined"
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`amountNoSign`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Packages"
                    variant="outlined"
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">35</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Vehicle Allowance */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={4}>
                    Vehicle Allowance
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      id={`amountNoSign`}
                      value={""}
                      InputLabelProps={{ shrink: true }}
                      label="Rate"
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      id={`amountNoSign`}
                      value={""}
                      InputLabelProps={{ shrink: true }}
                      label="Packages"
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell className="primeStuff" align="center">
                    $950
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default EmployeeRecordsEditor;
