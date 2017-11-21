import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions'

class Address extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, fields:{street1,street2,city,state,zip,country}} = this.props;
        country.value = 'United States'
        
        return (
            <div>
                {this.props.children}
                <form onSubmit={handleSubmit(this.props.onSaveAddress)}>
                    <fieldset className="form-group">
                        <label>* Street 1:</label>
                        <input type="text" {...street1} className="form-control" required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Street 2:</label>
                        <input type="text" {...street2} className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>City:</label>
                        <input type="text" {...city} className="form-control"  />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>State:</label>
                        <input type="text" {...state} className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>* Zip:</label>
                        <input type="text" {...zip} className="form-control" minLength="5" maxLength="5" required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Country:</label>
                        <input type="text" disabled {...country} className="form-control" />
                    </fieldset>
                    <button action="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'address',
    fields: ['street1','street2','city','state','zip','country']
},null, actions)(Address);