import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import Title from "../title";
import EmployeeList from "./components/employeesList/container";
import EmployeeEdit from "./components/employeeRemove";
import useStyles from "../../styles";
import { createEmployee } from "../../../../graphql/mutations";

const EmployeeMain = () => {
  const [newID, setNewID] = React.useState("");
  const [isAddloading, setIsAddLoading] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const handleAddID = async (newName, newID) => {
    setIsAddLoading(true);
    console.log(`New ID ${newID} and New Name: ${newName}`);
    const employee = { id: newID, name: newName };
    try {
      await API.graphql(graphqlOperation(createEmployee, { input: employee }));
      setNewID("");
      setNewID("");
    } catch (err) {
      console.log(err.errors);
    }
    setIsAddLoading(false);
  };
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <EmployeeList />
      <EmployeeEdit />
      {/* Add a new ID */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={clsx(classes.paper, classes.fixedHeightLong)}>
          <Title>Add new employee</Title>
          <form className={classes.form} noValidate>
            <TextField
              id="name"
              label="Name"
              onChange={val => {
                setNewName(val.target.value);
              }}
              variant="outlined"
            />
            <TextField
              id="id"
              label="ID"
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

export default EmployeeMain;
