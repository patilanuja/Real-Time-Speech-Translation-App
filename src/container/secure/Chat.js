import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Secure.css';
import { VirtualScroller } from 'primereact/virtualscroller';
import { Avatar } from 'primereact/avatar';
import { authService } from '../../service/AuthService';
import { chatService } from '../../service/ChatService';
import moment from 'moment';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: {},
            menuItems: [],
            playing: undefined,
            reload: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chat !== this.props.chat | this.state.reload) {
            chatService.get(authService.get(), this.props.chat.respondent.respondent.uid)
                .then(result => {
                    this.setState({
                        ...this.state,
                        chat: result,
                        reload: false
                    });
                });
        }
    }

    play(filename) {
        this.setState({
            ...this.state,
            playing: filename
        }, () => {
            chatService.getMessage(filename)
                .then(response => {
                    let audioUrl = URL.createObjectURL(response);
                    let audioElement = document.getElementById('audio');
                    audioElement.src = audioUrl;
                    audioElement.addEventListener('ended', () => {
                        // audioElement.remove();
                        this.setState({
                            ...this.state,
                            playing: undefined
                        })
                    });
                    audioElement.play();
                });
        });
    }

    stop() {
        let audioElement = document.getElementById('audio');
        audioElement.pause();
        this.setState({
            ...this.state,
            playing: undefined
        });
    }

    delete(id) {
        chatService.delete(id);
        this.setState({
            ...this.state,
            reload: true
        }, () => this.forceUpdate());
    }

    itemTemplate(item, props) {
        return (
            <div className={item.direction === 'in' ? 'secure-item-chat-row-left' : 'secure-item-chat-row-right'}>
                <Avatar size='xlarge' label={item.author.substring(0, 1)} style={{ backgroundColor: '#005a9a', color: 'white' }} />
                <div className='secure-item-chat-row-vertical'>
                    <div>{item.author}, {moment(new Date(item.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div style={{ display: item.filename !== this.state.playing ? 'block' : 'none' }}>
                        <i className="pi pi-play clickable" style={{ fontSize: '1.7rem', left: '-0.2em', position: 'relative' }}
                            onClick={() => this.play(item.filename)}></i>
                    </div>
                    <div style={{ display: item.filename === this.state.playing ? 'block' : 'none' }}>
                        <i className="pi pi-stop clickable" style={{ fontSize: '1.7rem', left: '-0.2em', position: 'relative' }}
                            onClick={() => this.stop()}></i>
                    </div>
                </div>
                <div>
                    <i className="pi pi-times clickable" style={{ fontSize: '1.7rem', left: '-0.2em', position: 'relative', paddingTop: '0.55em',
                                display: item.direction === 'in' ? 'none' : 'block' }}
                            onClick={() => this.delete(item.id)}></i>
                </div>
                <audio id='audio' controls style={{ display: 'none' }} />
            </div>
        );
    }

    render() {
        return (
            <div className='secure-container'>
                {this.state.chat.respondent && <span>Chat with {this.state.chat.respondent.name}</span>}
                <VirtualScroller items={this.state.chat.messages} itemSize={100} autoSize={false} style={{ height: '98%' }}
                    itemTemplate={(item) => this.itemTemplate(item, this.props)} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    chat: state.chat
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));