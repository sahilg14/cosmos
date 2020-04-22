import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (email, pass) => {
    if (!email) {
      setEmailErr(true);
      return;
    } else if (!pass) {
      setPassErr(true);
      return;
    }
    setIsLoading(true);

    Auth.signIn(email, pass)
      .then(user => {
        setIsLoading(false);
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setIsLoading(false);
      });
  };
  const checkIfSignedIn = () => {
    Auth.currentSession()
      .then(data => {
        setIsLoggedIn(true);
      })
      .catch(err => console.log(err));
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      {checkIfSignedIn()}
      {isLoggedIn && <Redirect to="/dashboard" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={emailErr}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            placeholder="test@test.com"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={val => {
              setEmail(val.target.value);
              setEmailErr(false);
            }}
            value={email}
            onKeyDown={e =>
              e.key === "Enter" ? handleSubmit(email, pass) : null
            }
          />
          <TextField
            error={passErr}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={val => {
              setPass(val.target.value);
              setPassErr(false);
            }}
            value={pass}
            onKeyDown={e =>
              e.key === "Enter" ? handleSubmit(email, pass) : null
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {error && (
            <Typography component="h1" variant="body1" color="error">
              Pleace check your inputs and try again.
            </Typography>
          )}
          <Grid container direction="row" justify="center" alignItems="center">
            {!isloading ? (
              <Button
                onClick={() => handleSubmit(email, pass)}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            ) : (
              <Grid style={{ textAlign: "center" }} item xs>
                <CircularProgress className={classes.progress} />
              </Grid>
            )}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs>
              <RouterLink to="/forgotpassword">
                <p variant="body2">{"Forgot your password ?"}</p>
              </RouterLink>
            </Grid>
            <Grid item xs>
              <RouterLink to="/signup">
                <p variant="body2">{"Sign Up for a new account."}</p>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
