import React from 'react';
import studentImage from "../../../../Assets/Avatar.png"
import classes from '../Student/studentimage.module.css';


   const StudentImage = () => (
       <div className={classes.stdimg}>
            <img alt="std" src={studentImage} width="35%"/>
       </div>
       
   )

export default StudentImage;