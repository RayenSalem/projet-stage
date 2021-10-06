import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import NextLink from "next/link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const router = useRouter();
  if (user == "undefined") {
    var user = null;
  }

  user = JSON.parse(localStorage.getItem("user")).user;

  if (user.isEmployee == true) {
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {[
            {
              name: "Employees board",
              icon: <AccessibilityNewIcon />,
              link: "/employees",
            },
          ].map(({ name, icon, link }, index) => (
            <NextLink href={link}>
              <ListItem button key={name}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </NextLink>
          ))}

          <ListItem
            button
            onClick={() => {
              localStorage.clear("user");
              router.push("/login");
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Divider />
      </Drawer>
    );
  } else {
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {[
            {
              name: "Admins board",
              icon: <SupervisorAccountIcon />,
              link: "/admins",
            },
            {
              name: "Employees board",
              icon: <AccessibilityNewIcon />,
              link: "/employees",
            },
          ].map(({ name, icon, link }, index) => (
            <NextLink href={link}>
              <ListItem button key={name}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </NextLink>
          ))}

          <ListItem
            button
            onClick={() => {
              localStorage.clear("user");
              router.push("/login");
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Divider />
      </Drawer>
    );
  }
}

export default Sidebar;
