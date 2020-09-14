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
          value="All"
          control={<Radio color="primary" />}
          label="All"
          labelPlacement="top"
          onClick={() => props.showByContinents("All")}
        />
        <FormControlLabel
          value="North America"
          control={<Radio color="primary" />}
          label="North America"
          labelPlacement="top"
          onClick={() => props.showByContinents("North America")}
        />
        <FormControlLabel
          value="Asia"
          control={<Radio color="primary" />}
          label="Asia"
          labelPlacement="top"
          onClick={() => props.showByContinents("Asia")}
        />
        <FormControlLabel
          value="Africa"
          control={<Radio color="primary" />}
          label="Africa"
          labelPlacement="top"
          onClick={() => props.showByContinents("Africa")}
        />
        <FormControlLabel
          value="Europe"
          control={<Radio color="primary" />}
          label="Europe"
          labelPlacement="top"
          onClick={() => props.showByContinents("Europe")}
        />
        <FormControlLabel
          value="Oceania"
          control={<Radio color="primary" />}
          label="Oceania"
          labelPlacement="top"
          onClick={() => props.showByContinents("Oceania")}
        />
        <FormControlLabel
          value="South America"
          control={<Radio color="primary" />}
          label="South America"
          labelPlacement="top"
          onClick={() => props.showByContinents("South America")}
        />
      </RadioGroup>
    </FormControl>
  );
}