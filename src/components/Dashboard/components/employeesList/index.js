import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import Title from "../title";
import "./style.css";
import * as queries from "../../../../graphql/queries";

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      isEmployeeListloading: true,
      options: []
    };
  }

  componentWillMount() {
    let allEmployees;
    let allOptions = [];
    const loadEmployees = async () => {
      try {
        allEmployees = await API.graphql(
          graphqlOperation(queries.listEmployees)
        );
        allEmployees = allEmployees.data.listEmployees.items;
        allEmployees.forEach(p => {
          allOptions.push({ label: p.name + " - " + p.id, value: p.id });
        });
        this.setState({ isEmployeeListloading: false });
      } catch (err) {
        console.log(err);
      }
    };
    loadEmployees();
    this.setState({ options: allOptions });
  }
  render() {
    const handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };
    return (
      <Grid item xs={12}>
        <Paper className={"paper"}>
          {this.state.isEmployeeListloading ? (
            <Grid
              style={{ textAlign: "center" }}
              item
              xs
              direction="row"
              justify="center"
              alignItems="center"
            >
              <CircularProgress className={"progress"} />
            </Grid>
          ) : (
            <div>
              <Title>Please choose an ID</Title>
              <Select
                value={this.state.selectedOption}
                onChange={e => {
                  handleChange(e.value);
                }}
                options={this.state.options}
              />
            </div>
          )}
        </Paper>
      </Grid>
    );
  }
}

export default EmployeeList;
