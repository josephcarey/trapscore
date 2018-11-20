import React, { Component } from 'react';
import axios from 'axios';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Button, List, ListItem, Modal } from '@material-ui/core/';

import ViewAdminEditCompetition from '../ViewAdminEditCompetition/ViewAdminEditCompetition';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

import { homeRoute } from '../../navigationRoutes';
import CancelRounded from '@material-ui/icons/CancelRounded';

const styles = theme => ({
  userDetail: {
    padding: 24,
    width: '100%',
  },
  contestDetail: {
    paddingLeft: 24,
    width: '100%',
  },
  list: {
    width: '50%',
    fontFamily: 'Roboto, sans-serif',
    borderStyle: 'solid',
    marginTop: '3%',
    paddingBottom: '1%',
    fontSize: '20px',
  },
  cancel: {
    color: 'red',
    float: 'right',
    marginRight: '2%',
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
    marginTop: '3%',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    overflowY: 'scroll',
    height: '80%',
    width: '67%',
    fontFamily: 'Roboto, sans-serif',
    borderStyle: 'solid',
  },
  logOutButton: {
    marginLeft: '3%',
  },

  editButton: {
    marginRight: '10%',
  },

  event: {
    backgroundColor: 'red',
  },
});

class ViewAdminSelectCompetition extends Component {
  state = {
    // Conditional Rendering Variables
    isVisible: false,
    isLogged: false,
    // Modal Variable
    open: false,
    //
    competitions: [],
    competitionToEdit: Number,
  };

  refreshData = () => {
    axios({
      method: 'GET',
      url: '/api/competition',
    }).then(response => {
      this.setState({
        ...this.state,
        competitions: response.data,
        isVisible: false,
      });
    });
  };

  componentDidMount() {
    this.refreshData();
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  addNewCompetition = event => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/api/competition',
    }).then(response => {
      console.log(response.data[0]);
      this.editCompetition(response.data[0]);
    });
  };

  editCompetition = selectedCompetition => {
    this.setState({
      ...this.state,
      competitionToEdit: selectedCompetition,
      isVisible: true,
      open: true,
    });
  };
  // Conditional Rendering for Log out
  handleLogOut = event => {
    event.preventDefault();
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT });
    // this.setState({
    //   ...this.state,
    //   isLogged: true,
    // });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    //Conditional Rendering if statements/variables
    let displayItem;
    let viewItem;
    if (this.state.isVisible) {
      displayItem = (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <CancelRounded
              className={classes.cancel}
              onClick={this.handleClose}
            >
              Close
            </CancelRounded>

            <ViewAdminEditCompetition
              edit={this.state.competitionToEdit}
              data={this.refreshData}
            />
          </div>
        </Modal>
      );
    }
    if (this.state.isLogged) {
      viewItem = this.props.history.push(homeRoute);
    }
    return (
      <center>
        <div className={classes.list}>
          <h1>Select Competition</h1>

          <List>
            {this.state.competitions.map(comp => {
              return (
                <ListItem key={comp.id} value={comp.id}>
                  <Button
                    className={classes.editButton}
                    variant="contained"
                    color="secondary"
                    onClick={() => this.editCompetition(comp)}
                  >
                    Edit
                  </Button>
                  {comp.name}
                </ListItem>
              );
            })}

            <Button
              color="primary"
              variant="contained"
              onClick={this.addNewCompetition}
            >
              Add Competition
            </Button>
            <Button
              className={classes.logOutButton}
              color="secondary"
              variant="contained"
              onClick={this.handleLogOut}
            >
              Log Out
            </Button>
            {displayItem}
            {viewItem}
          </List>
        </div>
      </center>
    );
  }
}

ViewAdminSelectCompetition.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(ViewAdminSelectCompetition);
