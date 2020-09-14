import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from "./Styles.js";

export default function FormControlLabelPlacement(props) {
    const classes = useStyles();
  return (
    <FormControl className={classes.form} component="fieldset">
      <RadioGroup className={classes.radioGroup} aria-label="position" name="position" defaultValue={props.continent}>
        <FormControlLabel
          className={classes.individual}
          value="All"
          control={<Radio color="primary" />}
          label="All"
          labelPlacement="top"
          onClick={() => props.showByContinents("All")}
        />
        <FormControlLabel
          className={classes.individual}
          value="North America"
          control={<Radio color="primary" />}
          label="N. America"
          labelPlacement="top"
          onClick={() => props.showByContinents("North America")}
        />
        <FormControlLabel
          className={classes.individual}
          value="South America"
          control={<Radio color="primary" />}
          label="S. America"
          labelPlacement="top"
          onClick={() => props.showByContinents("South America")}
        />
        <FormControlLabel
          className={classes.individual}
          value="Asia"
          control={<Radio color="primary" />}
          label="Asia"
          labelPlacement="top"
          onClick={() => props.showByContinents("Asia")}
        />
        <FormControlLabel
          className={classes.individual}
          value="Africa"
          control={<Radio color="primary" />}
          label="Africa"
          labelPlacement="top"
          onClick={() => props.showByContinents("Africa")}
        />
        <FormControlLabel
          className={classes.individual}
          value="Europe"
          control={<Radio color="primary" />}
          label="Europe"
          labelPlacement="top"
          onClick={() => props.showByContinents("Europe")}
        />
        <FormControlLabel
          className={classes.individual}
          value="Oceania"
          control={<Radio color="primary" />}
          label="Oceania"
          labelPlacement="top"
          onClick={() => props.showByContinents("Oceania")}
        />
      </RadioGroup>
    </FormControl>
  );
}