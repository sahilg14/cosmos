import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import Title from "../title";
import EmployeeList from "../employeesList";
import useStyles from "../../styles";
import { createEmployee } from "../../../../graphql/mutations";

const EmployeeUpdate = () => {
  const [newID, setNewID] = React.useState("");
  const [isAddloading, setIsAddLoading] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const handleAddID = async (newName, newID) => {
    setIsAddLoading(true);
    console.log(`New ID ${newID} and New Name: ${newName}`);
    const employee = { id: newID, name: newName };
    try {
      await API.graphql(graphqlOperation(createEmployee, { input: employee }));
    } catch (err) {
      console.log(err.errors);
    }
    setIsAddLoading(false);
  };
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <EmployeeList />
      {/* Add a new ID */}
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={clsx(classes.paper, classes.fixedHeightLong)}>
          <Title>Add new employee ID</Title>
          <form className={classes.form} noValidate>
            <TextField
              id="outlined-basic"
              label="ID"
              onChange={val => {
                setNewName(val.target.value);
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Name"
              onChange={val => {
                setNewID(val.target.value);
              }}
              variant="outlined"
            />

            {!isAddloading ? (
              <Button
                onClick={() => handleAddID(newName, newID)}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add
              </Button>
            ) : (
              <Grid
                style={{ textAlign: "center" }}
                item
                xs
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CircularProgress className={classes.progress} />
              </Grid>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmployeeUpdate;
