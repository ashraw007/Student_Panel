import React, {Component, Suspense} from 'react';
import Login from '../src/container/Login/login';
import Password from '../src/container/Password/Password';
import {Route, Switch} from 'react-router-dom';
import FourOFour from './utils/404/FourOFour'
import ResetPassword from './container/ResetPassword/ResetPassword'
import Cookies from 'js-cookie'; 
import Footer from './component/UI/Footer/Footer'
import FAQ from './component/UI/FAQ/FAQ'

const Layout = React.lazy(() => import('./hoc/layout'));


class App extends Component {
    
    state= {
      isAuthenticated: false
    }

    checkValidity = () => {
        if(Cookies.get('token')){
            this.setState({isAuthenticated: true})
        }
    }

    componentDidMount(){
        if(Cookies.get('token')){
            this.setState({isAuthenticated: true})
        }
    }

    render(){
        let route = (
            <Switch>
                <Route exact path="/reset-password/:id" component={ResetPassword} />
                <Route exact path="/forgot-password" component={Password}/>
                <Route exact path="/FAQ" component={FAQ}/>
                <Route exact path="/" render={()=><Login refresh={this.checkValidity} />} />
                <Route component={FourOFour} />
            </Switch>
        )

        if(this.state.isAuthenticated){
            route =       <Suspense fallback={<div>Loading...</div>}>
            <Layout />
          </Suspense>
        }

        return (
            <div>
                {route}
               {this.state.isAuthenticated ? null : <Route component={Footer} /> } 
            </div>
        )
    }
}

export default App;
