import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import firebase from "../../config/firebase"
import { urlBase } from '../../config/config';
import { authService } from '../../service/AuthService';
import { messageService } from '../../service/MessageService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import WaitingOverlay from '../../component/WaitingOverlay';
import './Auth.css';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            requestExecution: false
        }
        this.auth = getAuth(firebase);
        this.authSettings = {
            url: urlBase + '/auth/confirm',
            handleCodeInApp: true,
        };
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

    login() {
        if (!this.state.email || !this.state.email.includes('@')) {
            messageService.emitWarn('Login failed', 'Email is invalid');
            return;
        }

        this.setState({
            ...this.state,
            requestExecution: true
        });
        sendSignInLinkToEmail(this.auth, this.state.email, this.authSettings)
            .then(() => {
                this.setState({
                    ...this.state,
                    requestExecution: false
                });
                window.localStorage.setItem(
                    'linguaLOLemail',
                    JSON.stringify({
                        address: this.state.email,
                        expire: new Date().getTime() + 60 * 60 * 1000
                    })
                );
                this.redirect('/auth/wait');
            })
            .catch((error) => {
                this.setState({
                    ...this.state,
                    requestExecution: false
                });
                console.log(error)
                messageService.emitWarn('Login failed', 'Something went wrong');
                return;
            });
    }

    render() {
        return (
            <div>
                {this.state.requestExecution &&
                    <WaitingOverlay />
                }
                <div className='auth'>
                    <div className='auth-login-container'>
                        <div className='auth-login-item'>
                            <InputText placeholder='Email' keyfilter='email' autoFocus tabIndex='1'
                                onChange={(e) => this.setState({ ...this.state, email: e.target.value })} />
                        </div>
                        <div className='auth-login-item'>
                            <Button label='Login' className='ui-button-primary' tabIndex='3' onClick={() => this.login()}
                                disabled={!this.state.email || !this.state.email.includes('@')} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));