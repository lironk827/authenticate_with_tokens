import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions'

class Parcel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, fields:{width,height,length,weight}} = this.props;
        
        return (
            <div>
                {this.props.children}
                <form onSubmit={handleSubmit(this.props.onSaveContainer)}>
                    <fieldset className="form-group">
                        <label>Width:</label>
                        <input type="number" step="any" {...width} className="form-control" required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Height:</label>
                        <input type="number" step="any" {...height} className="form-control" required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Length:</label>
                        <input type="number" step="any" {...length} className="form-control" required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Weight:</label>
                        <input type="number" step="any" {...weight} className="form-control" required/>
                    </fieldset>
                    <button action="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'address',
    fields: ['width','height','length','weight']
},null, actions)(Parcel);