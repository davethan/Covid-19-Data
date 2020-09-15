import React from 'react';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useStyles from "./Styles.js";

export default function FormControlLabelPlacement(props) {
  const classes = useStyles();
  return(
    <div className={classes.form}>
      <ButtonGroup variant="text" size = "small" className={classes.buttonGroup} color="primary" aria-label="small outlined button group">
        <Button
          value="All"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("All")}
        >All</Button>
        <Button
          value="North America"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("North America")}
        >N. America</Button>
        <Button
          value="South America"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("South America")}
        >S. America</Button>
        <Button
          value="Asia"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("Asia")}
        >Asia</Button>
        <Button
          value="Africa"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("Africa")}
        >Africa</Button>
        <Button
          value="Europe"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("Europe")}
        >Europe</Button>
        <Button
          value="Oceania"
          control={<Radio color="primary" />}
          onClick={() => props.showByContinents("Oceania")}
        >Oceania</Button>
      </ButtonGroup>
    </div>
  );
}