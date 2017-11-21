import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearError();
    }

    handleFormSubmit(formData){
        const {email, password} = formData;
        this.props.signinUser({email, password});
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong> {this.props.errorMessage} </strong>
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, fields:{email, password}} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input type="email" {...email} className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input type="password" {...password} className="form-control" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error}
}

export default reduxForm({
    form: 'signin',
    fields: ['email','password']
},mapStateToProps, actions)(Signin);