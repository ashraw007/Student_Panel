import React from 'react';
import Accordion from './Accordion/Accordion'
import Checkbox from '../CheckBox/checkbox';

const BackFee = (props) => {
    let array = props.subjects

    let boxes = []
        if(props.subjects.length){
            boxes = array.map((keys) => {
                const made = keys.subjects.map((key) => (<Checkbox key={key.name} value={key.checked} sub={key.name} semester={keys.semester} handleChange={props.handleChange}/>));
                return made;
              });
        }

    return (
              <Accordion heading="Back Exam Fee" price={props.price}>
                {boxes}
              </Accordion>
    )
}

export default BackFee;

