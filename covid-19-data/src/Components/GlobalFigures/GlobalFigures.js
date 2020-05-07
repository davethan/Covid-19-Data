import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function GlobalFigures(props) {
    const data = props.Globals;
    // console.log(props.Globals)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
              Total Cases: 
          </ListItemIcon>
          <ListItemText primary={data.TotalConfirmed} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
              Total Deaths: 
          </ListItemIcon>
          <ListItemText primary={data.TotalDeaths} />
        </ListItem>
      </List>
      <Divider/>
    </div>
  );
}