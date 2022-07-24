import React from 'react';
import Drawer  from "@material-ui/core/Drawer";
import Lists from '../Lists/Lists'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
      color: 'black !important',
      minWidth: "15%"
    }
  });

const Slider = (props) => {
    const styles = useStyles();

    return (
       <React.Fragment>
           <Drawer
                anchor="left"
                open={props.DrawerOpen}
                onClose={props.drawerCloseHandler}
                classes={{ paper: styles.paper }}
            >
           <Lists/>
           </Drawer>
       </React.Fragment>
  ) 

}

export default Slider;