import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './NotFound.css';

class NotFound extends React.Component {
    render() {
        return (
            <div className='notfound'>
                <div className='notfound-back'>
                    <h1>404</h1>
                </div>
                <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
                <p>The link you clicked may be broken or the page may have been removed</p>
                <a onClick={() => this.props.history.goBack()}>Go back</a>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotFound));