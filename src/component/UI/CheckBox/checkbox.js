import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel'

const CheckBox = (props) => (
    <React.Fragment>
    <FormControlLabel 
    control = {
      <Checkbox
      checked={props.value}
      id={`${props.semester}`}
      label={props.sub}
      name={props.sub}
      onChange={(event,  id) => props.handleChange(event, props.semester)}
      color="primary"
    />}
     label={props.sub}
    />
   
  </React.Fragment>
)
        

export default CheckBox;





