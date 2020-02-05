import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Select from "react-select";
import Title from "../title";
import useStyles from "../../styles";

const options = [
  { value: "1", label: "Harnoor - 10002121" },
  { value: "2", label: "Aman - 12121222" },
  { value: "3", label: "Amir - 12121212" }
];

const EmployeeUpdate = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [newID, setNewID] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const handleChange = selectedOption => {
    setSelectedOption({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  const handleAddID = (newID, newName) => {
    console.log(`New ID ${newID} and New Name: ${newName}`);
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
        <Paper className={fixedHeightPaper}>
          <Title>Add new employee ID</Title>
          <form className={classes.form} noValidate>
            <TextField
              id="outlined-basic"
              label="Name"
              onChange={val => {
                setNewID(val.target.value);
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="ID"
              onChange={val => {
                setNewName(val.target.value);
              }}
              variant="outlined"
            />
            <Button
              onClick={() => handleAddID(newID, newName)}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmployeeUpdate;
