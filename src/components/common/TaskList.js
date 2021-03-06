import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  confirm: {
    color:"#fff",
    backgroundColor: "#FFA06D",
    '&:hover': {
        backgroundColor: "#E89264",
    },
},
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [null],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List dense>
            <ListItem challenge_1>
              <Avatar alt="challenge" src="challenge.jpg" />
              <ListItemText primary={`Challenge 1: Push Up * 30`} />
              <ListItemSecondaryAction>
                <Checkbox
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem challenge_2>
              <Avatar alt="challenge" src="challenge.jpg" />
              <ListItemText primary={`Challenge 2: Pull Up * 30`} />
              <ListItemSecondaryAction>
                <Checkbox
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem challenge_2>
              <Avatar alt="challenge" src="challenge.jpg" />
              <ListItemText primary={`Challenge 3: Pull Up * 30`} />
              <ListItemSecondaryAction>
                <Checkbox id = "checkbox3"
                />
              </ListItemSecondaryAction>
            </ListItem>
        </List>
        <Button variant="contained"className={classes.confirm}>
            Confirm
            
        </Button>
      </div>
      
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
