import React, {Component} from 'react';
import axios from '../../axios';

class Logout extends Component {

      componentDidMount = () => {
        axios.delete("/api/student/auth/logout",{withCredentials:true})
        .then( res => {
            window.location.href="/"
        })
        .catch(err => {console.log(err)})
    }


      render()
      {
          return(
             <div>

             </div>
          )
      }
}

export default Logout;