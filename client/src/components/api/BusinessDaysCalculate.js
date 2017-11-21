import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect }  from 'react-redux';

import RequireAuth from '../auth/Require_auth';
import * as actions from '../../actions';
// import 'react-datepicker/dist/react-datepicker';

class BusinessDaysCalculate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment()
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.calculateHandler = this.calculateHandler.bind(this);
        this.renderRows = this.renderRows.bind(this);
    }

    componentWillMount() {
        this.props.fetchUserResults();
    }

    handleStartDateChange(date) {
        this.setState({startDate: date});
    }

    handleEndDateChange(date) {
        this.setState({endDate: date});
    }

    calculateHandler(){
        let startDateString =  this.state.startDate.format('YYYY-MM-DD HH:mm');
        let endDateString =  this.state.endDate.format('YYYY-MM-DD HH:mm');
        this.props.calculateDays({startDateString, endDateString})
    }

    renderRows(){
        return this.props.calc.map( (result, index) => {
            return (
                <tr key={index}>    
                    <td>{result.startDateString}</td>
                    <td>{result.endDateString}</td>
                    <td>{result.difference}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <hr/>
                <div className="hBox">
                    <div>
                        <h4>Start date</h4>
                        <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="LLL"
                        />
                    </div>
                    <div>
                        <h4>End date</h4>
                        <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="LLL"
                        />
                    </div>
                </div>
                <button onClick={this.calculateHandler}> Calculate </button>
                <hr/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>    
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        calc: state.calc
    }
}

export default connect(mapStateToProps, actions)(RequireAuth(BusinessDaysCalculate));