import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import Title from "../../../title";
import "./style.css";
import * as queries from "../../../../../../graphql/queries";

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: null,
      isEmployeeListloading: true,
      options: []
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
  }
  render() {
    return (
      <Grid item xs={12} md={4} lg={4}>
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
                value={this.state.selectedValue}
                onChange={e => {
                  this.handleChange(e);
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
