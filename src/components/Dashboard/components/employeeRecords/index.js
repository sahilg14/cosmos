import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EmployeeRecordsHeader from "../employeeRecordsHeader";
import EmployeeRecordsEditor from "../employeeRecordsEditor";
import { withStyles } from "@material-ui/core/styles";

import { startOfWeek, eachDayOfInterval, addDays } from "date-fns";

import "./styles.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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

class EmployeeRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      startOfWeek: startOfWeek(new Date(), {
        weekStartsOn: 1
      }),
      updateMode: true
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
  handleUpdateMode = () => {
    this.setState({ updateMode: !this.state.updateMode });
  };
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Select payout week"
                format="MM/dd/yyyy"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <h2>{this.props.location.state.selectedEmployeeName}</h2>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <Button
              onClick={this.handleUpdateMode}
              variant="contained"
              color="primary"
            >
              {!this.state.updateMode ? "Update Mode" : "Read Mode"}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <Button variant="contained" color="primary" disabled>
              Show contact Info
            </Button>
          </Paper>
        </Grid>
        {/* Show the Records */}
        <Grid item xs={12}>
          {!this.state.updateMode ? (
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
                        <StyledTableCell align="center">
                          {p.toDateString()}
                        </StyledTableCell>
                        <StyledTableCell align="center">20</StyledTableCell>
                        <StyledTableCell align="center">30</StyledTableCell>
                        <StyledTableCell align="center">40</StyledTableCell>
                        <StyledTableCell align="center">50</StyledTableCell>
                        <StyledTableCell align="center">60</StyledTableCell>
                        <StyledTableCell align="center">70</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                  <StyledTableRow className="recordInputs">
                    <StyledTableCell colSpan={5} align="right">
                      TOTAL
                    </StyledTableCell>
                    <StyledTableCell align="center">181</StyledTableCell>
                    <StyledTableCell align="center">97</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow className="recordInputs">
                    <StyledTableCell colSpan={5} align="right">
                      ZONE 2
                    </StyledTableCell>
                    <StyledTableCell align="center">117</StyledTableCell>
                    <StyledTableCell align="center">35</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow className="recordInputs">
                    <StyledTableCell colSpan={4}></StyledTableCell>
                    <StyledTableCell colSpan={2} align="right">
                      Week Total
                    </StyledTableCell>
                    <StyledTableCell className="primeStuff" align="center">
                      $950
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmployeeRecordsEditor />
          )}
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={4}>
                    Vehicle Allowance
                  </StyledTableCell>
                  <StyledTableCell align="center">$0.14</StyledTableCell>
                  <StyledTableCell align="center">106</StyledTableCell>

                  <StyledTableCell className="primeStuff" align="center">
                    $950
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6}>
                    Background Check
                  </StyledTableCell>
                  <StyledTableCell className="minus" align="center">
                    $90
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6}>Admin Fees</StyledTableCell>
                  <StyledTableCell className="minus" align="center">
                    $100
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow className="recordInputs">
                  <StyledTableCell colSpan={6}>TOTAL Payout</StyledTableCell>
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

export default EmployeeRecords;
