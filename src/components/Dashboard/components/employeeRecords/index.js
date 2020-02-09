import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./styles.css";

class EmployeeRecords extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    const date = new Date();
    return (
      <Grid container spacing={3}>
        {/* Enter the Records */}
        <Grid item xs={12}>
          <Paper className="paper">
            <h2>{this.props.match.params.id}</h2>

            <h2>{date.toDateString()}</h2>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default EmployeeRecords;
