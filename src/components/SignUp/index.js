import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Tej Uncle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationCode, setAuthenticationCode] = useState("");

  const userSignUp = async e => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, given_name: firstName, family_name: lastName }
      });
      setStep(2);
    } catch (err) {
      console.log("this was the error: ", err);
    }
  };
  const confirmUserSignUp = async e => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, authenticationCode);
      setStep(3);
    } catch (err) {
      console.log("This was the error: ", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {step === 1 && (
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="I accept the terms and conditions to use this application."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => userSignUp(e)}
            >
              Sign Up
            </Button>
          </form>
        )}
        {step === 2 && (
          <div>
            <Typography component="h3" variant="h5">
              Please enter the verification code that you received in your
              email.
            </Typography>
            <form>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="authCode"
                  label="Authentication Code"
                  name="authCode"
                  autoComplete="authCode"
                  onChange={e => setAuthenticationCode(e.target.value)}
                />
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => confirmUserSignUp(e)}
              >
                Confirm Sign Up
              </Button>
            </form>
          </div>
        )}
        {step === 3 && (
          <div>
            <Typography component="h3" variant="h5">
              You have successfully signed up.
            </Typography>
            <RouterLink to="/">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                SignIn
              </Button>
            </RouterLink>
          </div>
        )}
        <Grid container justify="flex-end">
          <Grid item>
            <RouterLink to="/">
              <Link variant="body2">{"Already have an account? Sign in"}</Link>
            </RouterLink>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default SignUp;
