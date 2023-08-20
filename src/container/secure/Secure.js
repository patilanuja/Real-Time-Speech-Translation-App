import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../../config/firebase"
import Header from '../../component/Header';
import { authService } from '../../service/AuthService';
import { messageService } from '../../service/MessageService';
import { getUser, userLogin } from '../../connector/userConnector';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './Secure.css';
import ContactList from './ContactList';
import WaitingOverlay from '../../component/WaitingOverlay';
import Chat from './Chat';
import Recorder from './Recorder';

class Secure extends React.Component {
    constructor(props) {
        super(props);
        this.auth = getAuth(firebase);
        this.state = {
            uid: authService.get(),
            name: undefined,
            languages: ['Arabic', 'Danish', 'Dutch', 'English', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Korean', 'Portuguese', 
                'Russian', 'Spanish', 'Swedish', 'Turkish'],
            language: undefined,
            activated: false,
            requestExecution: false
        }
    }

    componentDidMount() {
        this.preventUnauthorized();
        this.setState({
            ...this.state,
            requestExecution: true
        });
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                getUser(authService.get())
                    .then((result) => {
                        this.setState({
                            ...this.state,
                            name: result.name,
                            language: result.language,
                            activated: result.name && result.language,
                            requestExecution: false
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
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.preventUnauthorized();
        return true;
    }

    preventUnauthorized() {
        if (!authService.get())
            this.logout();
    }

    logout() {
        this.redirect('/auth');
    }

    redirect(path) {
        this.props.history.push(path);
    }

    onboard() {
        this.setState({
            ...this.state,
            requestExecution: true
        });
        userLogin(authService.get(), this.state.name, this.state.language)
            .then((result) => {
                if (!result || result === 'null') {
                    messageService.emitWarn('Login failed', 'Something went wrong');
                    return;
                }
                this.setState({
                    ...this.state,
                    activated: true,
                    requestExecution: false
                })
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
            <div style={{ height: '100%'}}>
                {this.state.requestExecution &&
                    <WaitingOverlay />
                }
                <div className='secure-container'>
                    <div style={{ position: 'absolute', top: '0', height: '96px', width: '100%', marginTop: '0.7em' }}>
                        <Header />
                    </div>
                    <div className='secure-item-main'>
                        {!this.state.activated &&
                            <div className='auth'>
                                <div className='auth-login-container'>
                                    <div className='auth-login-item'>
                                        <InputText placeholder='Name' keyfilter={/[a-zA-Z]/} autoFocus tabIndex='1'
                                            onChange={(e) => this.setState({ ...this.state, name: e.target.value })} />
                                    </div>
                                    <div className='auth-login-item'>
                                        <Dropdown placeholder='Language' autoFocus tabIndex='2' value={this.state.language}
                                            onChange={(e) => this.setState({ ...this.state, language: e.target.value })}
                                            options={this.state.languages}
                                            className="w-full md:w-14rem" />
                                    </div>
                                    <div className='auth-login-item'>
                                        <Button label='Start' className='ui-button-primary' tabIndex='3' onClick={() => this.onboard()}
                                            disabled={!this.state.name || !this.state.language} />
                                    </div>
                                </div >
                            </div >
                        }
                        {this.state.activated &&
                            <div className='secure-main-container'>
                                <div className='secure-main-item-menu'><ContactList /></div>
                                <div className='secure-main-item-content secure-container'>
                                    <div className='secure-item-chat'><Chat /></div>
                                    <div className='secure-item-record'><Recorder /></div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Secure));