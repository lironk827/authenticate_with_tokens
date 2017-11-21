import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Address from './Address';
import Parcel from './Parcel';

class ShipRate extends Component {
    constructor(props) {
        super(props);

        this.state = {toAddress: null, fromAddress: null, parcel: null}
        this.saveToAdress = this.saveToAdress.bind(this)
        this.saveFromAdress = this.saveFromAdress.bind(this)
        this.saveContainer = this.saveContainer.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.handleRate = this.handleRate.bind(this);
    }

    saveContainer(parcelData){
        this.setState({parcel:parcelData});
    }

    saveToAdress(formData) {
        formData.country = "United States";
        this.setState({toAddress: formData});
    }

    saveFromAdress(formData) {
        formData.country = "United States";
        this.setState({fromAddress: formData});
    }

    handleRate() {
        this.props.calculateRate(this.state)
    }

    renderSubmitButton() {
        if (this.state.parcel && this.state.fromAddress && this.state.fromAddress) {
            return (
                <div>
                    <h3>Shipment rating</h3>
                    <div>
                        <button onClick={this.handleRate} className="btn btn-primary">Rate</button>   
                    </div>  
                    <div className="rate_result">
                        <h4>Shipment rate is: {this.props.rate} </h4> 
                    </div>          
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2> Shiping ratings for USPS carrier</h2>
                <h5> * must fields </h5>
                <hr/>
                <div className="hBox">
                    <Address form="1" onSaveAddress={this.saveFromAdress}>
                        <h3>From</h3>
                    </Address>
                    <Address form="2" onSaveAddress={this.saveToAdress}>
                        <h3>To</h3>
                    </Address>
                    <Parcel onSaveContainer={this.saveContainer}>
                        <h3>Parcel</h3>
                    </Parcel>
                    <div className="rating_container">
                        {this.renderSubmitButton()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rate: state.rate
    }
}

export default connect(mapStateToProps, actions)(ShipRate);