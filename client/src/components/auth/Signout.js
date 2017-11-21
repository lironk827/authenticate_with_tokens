import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions';

class SignOut extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.signoutUser();
    }

    componentDidMount() {
        setTimeout(() => browserHistory.push('/signin'),1000);
    }

    render() {
        return (
            <div>
                Have a nice day...
            </div>
        )
    }
}

export default connect(null, actions)(SignOut);