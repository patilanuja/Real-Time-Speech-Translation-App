import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authService } from '../service/AuthService';

class Default extends React.Component {

    componentDidMount() {
        let uid = authService.get();
        if (uid && uid.token)
            this.redirect('/secure');
        else
            this.redirect('/auth');
    }

    redirect(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div>qwe</div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Default));