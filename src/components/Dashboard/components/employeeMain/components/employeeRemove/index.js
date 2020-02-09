import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import API, { graphqlOperation } from "@aws-amplify/api";
import clsx from "clsx";
import Title from "../../../title";
import useStyles from "../../../../styles";
import { updateEmployee } from "../../../../../../graphql/mutations";

const EmployeeRemove = props => {
  const [isDeleteloading, setIsDeleteloading] = React.useState(false);
  const handleDeleteID = async (newName, newID) => {
    setIsDeleteloading(true);
    console.log(`New ID ${newID} and New Name: ${newName}`);
    const employee = { id: newID, name: newName };
    try {
      await API.graphql(graphqlOperation(updateEmployee, { input: employee }));
    } catch (err) {
      console.log(err.errors);
    }
    setIsDeleteloading(true);
  };
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper className={clsx(classes.paper, classes.fixedHeightLong)}>
        <Title>Delete employee</Title>
        <form className={classes.form} noValidate>
          <h3>12345</h3>
          {!isDeleteloading ? (
            <Button
              onClick={() => handleDeleteID()}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Delete
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
  );
};

export default EmployeeRemove;
