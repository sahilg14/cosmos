import React from "react";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { mainListItems, secondaryListItems } from "./components/listItems";
import EmployeeMain from "./components/employeeMain";
import EmployeeRecords from "./components/employeeRecords/container";
import Basic from "./components/basic";
import "./styles.css";
import useStyles from "./styles";

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

const Dashboard = props => {
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const [currentUserName, setCurrentUserName] = React.useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    Auth.signOut()
      .then(data => {
        console.log(data);
        setIsLoggedOut(true);
      })
      .catch(err => console.log(err));
  };
  const checkIfSignedOut = () => {
    Auth.currentSession()
      .then(data => {
        setIsLoggedOut(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoggedOut(true);
      });
  };

  (() => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        setCurrentUserName(data.signInUserSession.idToken.payload.given_name);
      })
      .catch(err => {
        console.log(err);
      });
  })();

  if (isLoggedOut) return <Redirect push to="/" />;

  return (
    <Router>
      <div className={classes.root}>
        {checkIfSignedOut()}
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {`Dashboard - Welcome ${currentUserName}`}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => {
                handleLogout();
              }}
              color="inherit"
            >
              <PowerIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/dashboard" component={Basic} />
              <Route path="/dashboard/employees" component={EmployeeMain} />
              <Route
                path="/dashboard/employee/:id"
                component={EmployeeRecords}
              />
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
