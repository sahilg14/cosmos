import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Link as RouterLink } from "react-router-dom";

import Title from "../../../title";
import "./style.css";
import * as queries from "../../../../../../graphql/queries";

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: { value: null, label: "" },
      isEmployeeListloading: true,
      options: [],
      redirectToEmployee: false
    };
  }

  componentDidMount() {
    let allOptions = [];
    const loadEmployees = async () => {
      try {
        let allEmployees = await API.graphql(
          graphqlOperation(queries.listEmployees)
        );
        allEmployees = allEmployees.data.listEmployees.items;
        allEmployees.forEach(p => {
          allOptions.push({ label: p.name + " - " + p.id, value: p.id });
        });
        this.setState({ ...this.state, isEmployeeListloading: false });
      } catch (err) {
        console.log(err);
      }
    };
    loadEmployees();
    this.setState({ ...this.state, options: allOptions });
  }
  handleChange(e) {
    this.setState({ ...this.state, selectedValue: e });
    this.props.setSelectedEmployee(e.value, e.label);
  }
  handleEdit() {
    this.setState({ ...this.state, redirectToEmployee: true });
  }
  render() {
    if (this.state.redirectToEmployee === true) {
      return (
        <RouterLink
          to={`/dashboard/employee/${this.state.selectedValue.value}`}
        />
      );
    }
    return (
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={"paper"}>
          {this.state.isEmployeeListloading ? (
            <Grid style={{ textAlign: "center" }} item xs>
              <CircularProgress className={"progress"} />
            </Grid>
          ) : (
            <div>
              <Title>Please choose an ID</Title>
              <Select
                value={this.state.selectedValue}
                onChange={e => {
                  this.handleChange(e);
                }}
                options={this.state.options}
              />
            </div>
          )}
          {this.state.selectedValue.value && (
            <RouterLink
              to={{
                pathname: `/dashboard/employee/${this.state.selectedValue.value}`,
                state: {
                  selectedEmployeeName: this.state.selectedValue.label,
                  selectedEmployeeId: this.state.selectedValue.value
                }
              }}
            >
              <Button
                onClick={() => this.handleEdit()}
                variant="contained"
                color="primary"
                // className={classes.submit}
              >
                Edit Data
              </Button>
            </RouterLink>
          )}
        </Paper>
      </Grid>
    );
  }
}

export default EmployeeList;
