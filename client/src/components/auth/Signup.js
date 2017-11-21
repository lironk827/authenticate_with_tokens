import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearError();
    }

    handleFormSubmit(formData){
        const {email, password} = formData;
        this.props.signupUser({email, password});
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
        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label>Email: </label>
                    <input className="form-control" {...email} type="email" />
                    { email.touched &&
                      email.error &&
                      <div className="alert alert-danger">{email.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>password: </label>
                    <input className="form-control" {...password} type="password" />
                    { password.touched &&
                      password.error && 
                      <div className="alert alert-danger">{password.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>Comfirm password: </label>
                    <input className="form-control" {...passwordConfirm} type="password" />
                    { passwordConfirm.touched &&
                      passwordConfirm.error &&
                      <div className="alert alert-danger">{passwordConfirm.error}</div> }
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        );
    }
}

function validate(formData) {
    let errors = {};
    for (let prop in formData) {
        if (!formData[prop]) {
            errors[prop] = `Please enter ${prop}`;
        }
    }

    if (formData.password !== formData.passwordConfirm) {
        errors.password = 'Passwords must match'        
    }
    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: ['email','password','passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);


