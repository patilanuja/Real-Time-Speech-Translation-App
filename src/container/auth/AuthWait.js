import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authService } from '../../service/AuthService';
import './Auth.css';

class AuthWait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.preventAuthorized();
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.preventAuthorized();
        return true;
    }

    preventAuthorized() {
        if (authService.get())
            this.redirect('/secure');
    }

    redirect(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className='notfound'>
                <p>An email has been sent to your email address. Please click the link in the email to complete your registration.</p>
                <a onClick={() => this.props.history.goBack()}>Try again</a>
            </div>
        )
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWait));