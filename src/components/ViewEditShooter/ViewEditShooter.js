import React, { Component } from "react";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({   
 


  editform: {
    float: 'right',
    marginRight: '20%',
    marginTop: '4%',
    borderStyle: 'solid',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif'
  }
  
});

class ViewEditShooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.selectedShooter.id,
      first_name: "",
      last_name: "",
      email: "",
      handicap: "",
      phone: "",
      ata_number: ""
    };
  }


  updateUser = () => {
    toast('Changes saved')
    console.log("update button working");
    axios({
      method: "PUT",
      url: `/api/competition/shooter/${this.state.id}`,
      data: this.state
    }).then((response) => {
        console.log(response);
        this.setState({
        })
        
        
    })
  };




  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.setState({
        ...this.props.selectedShooter
      });
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.editform}>
        <List>
          <ListItem>
          First Name:
          <TextField
            
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.first_name}
            onChange={this.handleChangeFor("first_name")}
          />
          </ListItem>
          <ListItem>
          Last Name:
          <TextField
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.last_name}
            onChange={this.handleChangeFor("last_name")}
          />
          </ListItem>
          <ListItem>
          E-Mail:
          <TextField
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.email}
            onChange={this.handleChangeFor("email")}
          />
          </ListItem>
          <ListItem>
          Phone Number:
          <TextField
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.phone}
            onChange={this.handleChangeFor("phone")}
          />
          </ListItem>
          <ListItem>
          Handicap (yds):
          <TextField
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.handicap}
            onChange={this.handleChangeFor("handicap")}
          />
          </ListItem>
          <ListItem>
          ATA Number:
          <TextField
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.ata_number}
            onChange={this.handleChangeFor("ata_number")}
          />
          </ListItem>
                <Button className={classes.searchButton} variant="contained" color="primary" onClick={()=>{this.updateUser(this.state.id)}}>Save Changes</Button>
                </List>
        </form>
      
      </div>
    );
  }
}

export default withStyles(styles) (ViewEditShooter);
