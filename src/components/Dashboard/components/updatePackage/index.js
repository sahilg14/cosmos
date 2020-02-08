import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import Title from "../title";
import useStyles from "../../styles";
import { createEmployee } from "../../../../graphql/mutations";

const options = [
  { value: "1", label: "Harnoor - 10002121" },
  { value: "2", label: "Aman - 12121222" },
  { value: "3", label: "Amir - 12121212" }
];

const EmployeeUpdate = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [newID, setNewID] = React.useState("");
  const [isAddloading, setIsAddLoading] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const handleChange = selectedOption => {
    setSelectedOption({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  const handleAddID = async (newID, newName) => {
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Title>Please choose an ID</Title>
          <Select
            value={selectedOption}
            onChange={() => {
              handleChange(selectedOption);
            }}
            options={options}
          />
        </Paper>
      </Grid>
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
                onClick={() => handleAddID(newID, newName)}
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
