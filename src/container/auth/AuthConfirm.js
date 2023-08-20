import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import firebase from "../../config/firebase"
import { authService } from '../../service/AuthService';
import { messageService } from '../../service/MessageService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { userLogin } from '../../connector/userConnector.js';
import WaitingOverlay from '../../component/WaitingOverlay';
import './Auth.css';

class AuthConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            askEmail: false,
            requestExecution: false
        };
        this.auth = getAuth(firebase);
    }

    componentDidMount() {
        this.preventAuthorized();

        if (isSignInWithEmailLink(this.auth, window.location.href)) {
            let email = JSON.parse(window.localStorage.getItem('linguaLOLemail'));
            if (email.expire < new Date().getTime()) {
                this.setState({
                    ...this.state,
                    askEmail: true
                });
                return;
            }
            this.setState({
                ...this.state,
                email: email.address
            }, this.signIn);
        }
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

    signIn() {
        this.setState({
            ...this.state,
            requestExecution: true
        });
        signInWithEmailLink(this.auth, this.state.email, window.location.href)
            .then((result) => {
                userLogin(result.user.uid)
                    .then((response) => {
                        this.setState({
                            ...this.state,
                            requestExecution: false
                        });
                        authService.login(result.user.uid);
                        window.localStorage.removeItem('linguaLOLemail');
                        this.redirect('/secure');
                    })
                    .catch((error) => {
                        this.setState({
                            ...this.state,
                            requestExecution: false
                        });
                        console.log(error);
                        messageService.emitWarn('Login failed', 'Something went wrong');
                        return;
                    });
            })
            .catch((error) => {
                this.setState({
                    ...this.state,
                    requestExecution: false
                });
                console.log(error);
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
                            <Button label='Confirm' className='ui-button-primary' tabIndex='3' onClick={() => this.signIn()}
                                disabled={!this.state.email || !this.state.email.includes('@')} />
                        </div>
                    </div >
                </div >
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthConfirm));