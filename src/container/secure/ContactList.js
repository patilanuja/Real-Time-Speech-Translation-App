import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userList } from '../../connector/userConnector';
import { VirtualScroller } from 'primereact/virtualscroller';
import { Avatar } from 'primereact/avatar';
import './Secure.css';
import { authService } from '../../service/AuthService';
import { createChatChangeAction } from '../../factory/chatActionFactory';

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        userList(authService.get())
            .then((result) => {
                let list = result.map(u => {
                    let tmp = {};
                    tmp['key'] = u.uid;
                    tmp['label'] = u.name;
                    return tmp;
                });
                this.setState({
                    ...this.state,
                    users: list
                });
            })
    }

    itemTemplate(item, props) {
        function changeChat() {
            props.changeChat(item.key, item.label);
        }

        return (
            <div className='secure-item-contactlist-item' onClick={() => changeChat()}>
                <div><Avatar label={item.label.substring(0, 1)} style={{ backgroundColor: '#005a9a', color: 'white' }} /></div>
                <div>{item.label}</div>
            </div>
        );
    }

    render() {
        return (
            <div className='secure-container secure-item-contactlist'>
                <VirtualScroller items={this.state.users} itemSize={100} autoSize={true} style={{ height: '100%' }}
                    itemTemplate={(item) => this.itemTemplate(item, this.props)} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    changeChat: (uid, name) => dispatch(createChatChangeAction(uid, name))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactList));