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
    const startDate = startOfWeek(new Date(), {
      weekStartsOn: 1
    });
    this.sp = React.createRef();
    this.arrayOfWeek = eachDayOfInterval({
      start: startDate,
      end: addDays(startDate, 6)
    });
    this.state = {
      selectedDate: new Date(),
      startOfWeek: startOfWeek(new Date(), {
        weekStartsOn: 1
      }),
      date: this.arrayOfWeek.reduce(
        (o, key) => ({
          ...o,
          [key.toDateString()]: { sp: 20, nsp: 21, spa: 105, nspa: 105 }
        }),
        {}
      )
    };
  }

  updateWeeklyValue = (currentDate, field, value) => {
    console.log("hey");
    console.log("currentDate inside function", currentDate);
    switch (field) {
      case 0: //sp
        this.setState({
          ...this.state,
          date: {
            [currentDate]: {
              sp: value
            }
          }
        });
        break;
      case "spa":
        this.setState({
          ...this.state,
          date: {
            [currentDate]: {
              spa: value
            }
          }
        });
        break;
      case "nsp":
        this.setState({
          ...this.state,
          date: {
            [currentDate]: {
              nsp: value
            }
          }
        });
        break;
      case "nspa":
        this.setState({
          ...this.state,
          date: {
            [currentDate]: {
              nspa: value
            }
          }
        });
        break;
      default:
        return this.state;
    }
  };

  handleDateChange = date => {
    this.setState({
      ...this.state,
      selectedDate: date,
      startOfWeek: startOfWeek(date, {
        weekStartsOn: 1
      })
    });
  };
  render() {
    console.log("sp ref value", this.sp);
    let currentDate;
    return (
      <Grid item xs={12}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <EmployeeRecordsHeader />
              <TableBody>
                {this.arrayOfWeek.map((p, idx) => {
                  currentDate = p.toDateString();
                  return (
                    <StyledTableRow className="recordInputs" key={idx}>
                      <StyledTableCell align="center">
                        <TextField
                          className="extraWidth"
                          id={currentDate}
                          value={currentDate}
                          InputLabelProps={{ shrink: true }}
                          label=""
                          variant="filled"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          ref={() => (this.sp.current.currentDate = "2")}
                          id={`${currentDate}-sp`}
                          value={"2"}
                          onChange={e => {
                            this.updateWeeklyValue(
                              e.target.id.split("-")[0],
                              0,
                              e.target.value
                            );
                          }}
                          InputLabelProps={{ shrink: true }}
                          label="Packages"
                          variant="outlined"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          id={`${currentDate}-spa`}
                          value={""}
                          InputLabelProps={{ shrink: true }}
                          label="Amount"
                          variant="outlined"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          id={`${currentDate}-nsp`}
                          value={""}
                          InputLabelProps={{ shrink: true }}
                          label="Packages"
                          variant="outlined"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          id={`${currentDate}-nspa`}
                          value={""}
                          InputLabelProps={{ shrink: true }}
                          label="Amount"
                          variant="outlined"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">Total 20</StyledTableCell>
                      <StyledTableCell align="center">Total 30</StyledTableCell>
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
                  <StyledTableCell colSpan={4} align="left">
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
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6} align="left">
                    Week Total
                  </StyledTableCell>
                  <StyledTableCell className="primeStuff" align="center">
                    $950
                  </StyledTableCell>
                </StyledTableRow>

                {/* Vehicle Allowance */}

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
                  <StyledTableCell align="center">$950</StyledTableCell>
                </StyledTableRow>

                {/* Background Check */}

                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6}>
                    Background Check
                  </StyledTableCell>
                  <StyledTableCell className="minus normalCell" align="center">
                    <TextField
                      id={`amountNoSign`}
                      value={""}
                      InputLabelProps={{ shrink: true }}
                      label="Rate"
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6}>Admin Fees</StyledTableCell>
                  <StyledTableCell className="minus normalCell" align="center">
                    <TextField
                      id={`amountNoSign`}
                      value={""}
                      InputLabelProps={{ shrink: true }}
                      label="Rate"
                      variant="outlined"
                      size="small"
                    />
                  </StyledTableCell>
                </StyledTableRow>

                {/* Final Value */}

                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6} align="right">
                    TOTAL PAYOUT
                  </StyledTableCell>
                  <StyledTableCell className="cash" align="center">
                    $1200.00
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
