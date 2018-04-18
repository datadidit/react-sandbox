import React from 'react';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  BrowserRouter as Router
} from 'react-router-dom';
import PhilliesLogo from '../images/PhilliesLogo.svg';
import CloseIcon from 'material-ui-icons/Close';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import { ThroughProvider } from 'react-through';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const BASE_PATH = '/';

const drawerStyle = theme => ({
  drawerPaper: {
    height: '100%',
    width: '100%'
  },
  toolbar: theme.mixins.toolbar
});

class MyDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawerPaper}
        variant={'permenant'}
        anchor={'left'}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>FOO</ListItem>
          <ListItem>BAR</ListItem>
        </List>
      </Drawer>
    );
  }
}

const StyledDrawer = withStyles(drawerStyle)(MyDrawer);

const styles = theme => ({
  root: {
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%'
  },
  appBar: {
    flexGrow: 1
  },
  navigation: {
    backgroundColor: grey[50]
  },
  content: {
    backgroundColor: grey[200]
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: {
    minHeight: 60,
    display: 'flex'
  },
  navLogo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 60
  },
  listStyle: {
    backgroundColor: 'white',
    color: blue[900]
  },
  activeButton: {
    background: blue[500],
    color: red[500]
  }
});

class SimpleAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: this.props.openDrawer
    };
  }

  render() {
    const { classes, handleDrawer } = this.props;

    return (
      <div className={classes.appBar}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              onClick={handleDrawer}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const MyAppBar = withStyles(styles)(SimpleAppBar);

class MyNavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavClick(event) {
    if (this.props.width < 960) {
      this.props.handleDrawer();
    }
  }
  render() {
    const { classes, width, handleDrawer } = this.props;
    let close;
    if (width < 960) {
      close = (
        <IconButton
          onClick={handleDrawer}
          className={classes.menuButton}
          aria-label="Delete"
        >
          <CloseIcon />
        </IconButton>
      );
    }
    return (
      <Grid className={classes.navigation} item xs={12} md={2}>
        <div className={classes.toolbar}>
          {close}
          <img src={PhilliesLogo} className={classes.navLogo} />
        </div>
        <Divider />
        <List className={classes.listStyle}>
          <NavLink activeClassName={classes.activeButton} to="/link1">
            <ListItem button onClick={event => this.handleNavClick(event)}>
              Link1
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink activeClassName={classes.activeButton} to="/link2">
            <ListItem button onClick={event => this.handleNavClick(event)}>
              Link2
            </ListItem>
          </NavLink>
        </List>
      </Grid>
    );
  }
}

const StyledNavigationDrawer = withStyles(styles)(MyNavigationDrawer);

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, handleDrawer } = this.props;
    return (
      <Grid className={classes.content} item xs>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <MyAppBar handleDrawer={handleDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Breadcrumbs />
            <Switch>
              <Route exact path="/link1" component={Page1} />
              <Route exact path="/link2" component={Page2} />
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const StyledMain = withStyles(styles)(Main);

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, link } = this.props;
    return (
      <div>
        <div>
          <BreadcrumbsItem to={BASE_PATH + link}>{name}</BreadcrumbsItem>
        </div>
        {name}
      </div>
    );
  }
}

const Page1 = () => <SampleComponent name={'Page 1'} link={'link1'} />;
const Page2 = () => <SampleComponent name={'Page 2'} link={'link2'} />;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      showContent: window.innerWidth > 960,
      width: window.innerWidth
    };
  }

  updateOpenDrawer = event => {
    this.setState({
      openDrawer: !this.state.openDrawer
    });
  };

  updateView() {
    let width = window.innerWidth;
    const { openDrawer, showContent } = this.state;
    this.setState({
      width: width
    });
    if (openDrawer && width < 960) {
      this.setState({
        showContent: false
      });
    } else {
      this.setState({
        showContent: true
      });
    }
  }

  componentDidMount() {
    // https://www.hawatel.com/blog/handle-window-resize-in-react/
    this.updateView();
    window.addEventListener('resize', this.updateView.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateView.bind(this));
  }

  render() {
    const { classes } = this.props;
    const { openDrawer, showContent, width } = this.state;
    let drawer, main;
    if (openDrawer) {
      drawer = (
        <StyledNavigationDrawer
          handleDrawer={this.updateOpenDrawer}
          width={width}
        />
      );
    }

    if (showContent || !openDrawer) {
      main = <StyledMain handleDrawer={this.updateOpenDrawer} />;
    }

    return (
      <Router>
        <ThroughProvider>
          <Grid className={classes.root} container spacing={0}>
            {drawer}
            {main}
          </Grid>
        </ThroughProvider>
      </Router>
    );
  }
}

export default compose(withStyles(styles), withWidth())(App);
