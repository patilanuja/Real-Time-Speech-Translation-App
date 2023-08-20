import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import { authService } from '../service/AuthService';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <div id="flex-box" style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '5px 20px 0px'}}>
                    <div id="left-flex" style={{ flex: '1'}}></div>
                    <div id="center-flex" style={{flex: '4 100%', textAlign: 'center'}}>
                    </div>
                    <div id="right-flex" style={{ flex: '1' }}>
                        <Button label="Logout" onClick={() => authService.logout()} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));