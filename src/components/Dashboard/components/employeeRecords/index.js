import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { startOfWeek, eachDayOfInterval, addDays } from "date-fns";

import "./styles.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

class EmployeeRecords extends React.Component {
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <h2>{this.props.match.params.id}</h2>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="paper heightFixed">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
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
        {/* Enter the Records */}
        <Grid item xs={12}>
          <Paper className="paper autoHeight">
            {eachDayOfInterval({
              start: this.state.startOfWeek,
              end: addDays(this.state.startOfWeek, 6)
            }).map((p, idx) => {
              return (
                <div class="recordInputs" key={idx}>
                  <TextField
                    className="extraWidth"
                    id={`date-${idx}`}
                    value={p.toDateString()}
                    InputLabelProps={{ shrink: true }}
                    label="Monday"
                    variant="filled"
                    size="small"
                  />
                  <TextField
                    id={`packagesSign-${idx}`}
                    value={"10"}
                    InputLabelProps={{ shrink: true }}
                    label="Packages"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`amountSign-${idx}`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Amount"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`packagesNoSign-${idx}`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Packages"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`amountNoSign-${idx}`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Amount"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`packagesTotal-${idx}`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Packages"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id={`amountTotal-${idx}`}
                    value={""}
                    InputLabelProps={{ shrink: true }}
                    label="Amount"
                    variant="outlined"
                    size="small"
                  />
                </div>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default EmployeeRecords;
