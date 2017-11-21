import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

    renderLinks() {
        function generateLinks(linkName, linkRoute) {
            return (
                <li key={linkName} className="nav-item">
                    <button className={linkName}><Link className="nav-link" to={linkRoute}>{linkName}</Link>
                    </button>
                </li>
            );
        }

        if (this.props.authenticated) {
            return [
                generateLinks('Calculate bussines days', '/api/BusinessDaysCalc'),
                generateLinks('calculate shipment rates', '/api/getRate'),
                generateLinks('Sign out', '/signout')];
        } else {
            return [
                generateLinks('Sign in', '/signin'),
                generateLinks('Sign up', '/signup')
            ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Header)
