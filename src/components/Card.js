import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import cardback from '../imgs/cardback.jpg';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import shield from '../imgs/item-icons/shield.png';
import leather from '../imgs/item-icons/studded-leather.png';
import tunic from '../imgs/item-icons/tunic.png';

const pics = [shield, tunic, leather]; 

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const images = [
  {
    url: '../imgs/cardback.jpg',
    title: 'Card 1',
    width: '30%',
  },
  {
    url: '/static/imgs/cardback.jpg',
    title: 'Card 2',
    width: '30%',
  },
  {
    url: '/static/imgs/cardback.jpg',
    title: 'Card 3',
    width: '30%',
  },
];



class ButtonBases extends Component {
  constructor(props){
    super(props);
    this.state = {
       showModal: false,
       chosenCard: '', 
       title: '', 
       img: ''
    };
  }
  
  componentWillMount() {
    let num = Math.floor(Math.random() * 3); 
    this.setState({chosenCard: pics[num]});
    if(num === 0) {
      this.setState({
        title: 'Magic Shield',
        img: shield
      })
    } else if(num === 1) {
      this.setState({
        title: 'Golen Tunic',
        img: tunic 
      })
    } else {
      this.setState({
        title: 'Super Leather',
        img: leather
      })
    }
   
  }

  handleClick = () => {
    this.setState({showModal: true});
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };
  
  toStats = () => {
    var storedItems = [];
    if(localStorage.getItem('items') !== null){
      storedItems = JSON.parse(localStorage.getItem("items"));
    }
    storedItems.push({img: this.state.img, title: 'new'});
    localStorage.setItem("items", JSON.stringify(storedItems));

    this.props.history.push('/stats');
  }
  
  getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render() {
  const { classes } = this.props;
  return (
    <div className="root">
      <div style={{marginLeft:'60px ', marginBottom:'20px'}}>
      Now you have a chance to draw a card!
      </div>
      <div>
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showModal}
          onClose={this.handleClose}
          disableBackdropClick={true}
        >
          <div style={this.getModalStyle()} className={classes.paper}>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Typography variant="h6" id="modal-title">
              Congratulations!!
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                You got a lengendary weapon: {this.state.title}
              </Typography>
              <img src = {this.state.chosenCard} alt="card-weapon"/>
              {
                this.state.chosenCard === tunic ?
                <span>Luck + 18 and Speed + 6</span> :
                this.state.chosenCard === leather ?
                <span>Attack + 10 and Speed + 2</span> :
                <span>Defend + 13 and Luck + 17</span> 
              }
              <Button color="primary" onClick={this.toStats}>Check out your new weapon in your collection!</Button>
            </div>
          </div>
        </Modal>
      {
        this.state.showModal 
        ?
        <div></div>
        :
        images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
            onClick={this.handleClick}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <img src = {cardback} alt="cardback"  style={{marginLeft:'60px '}}/>
            <span style={{marginLeft:'60px '}} className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                  style={{marginLeft:'60px '}}
                >
                {image.title}
                <span className={classes.imageMarked}/>
              </Typography>
            </span>
          </ButtonBase>
          
        ))
      }
        </div>
    </div>
    
  );
}
}
ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);






