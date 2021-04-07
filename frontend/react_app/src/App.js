import React from 'react';
import Urls from './Urls';
import Layout from './components/Layout';
import { connect } from 'react-redux';
import * as actions from './store/authActions';


function App(props) {

  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);

  return (
    <div className="App">
      <Layout {...props}>
        <Urls {...props}/>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined', token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
