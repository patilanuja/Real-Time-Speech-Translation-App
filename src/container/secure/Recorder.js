import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Secure.css';
import RecordRTC from 'recordrtc';
import { authService } from '../../service/AuthService';
import { fileService } from '../../service/FileService';
import { chatService } from '../../service/ChatService';
import 'primeicons/primeicons.css';

class Recorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chat !== this.props.chat) {
            chatService.get(authService.get(), this.props.chat.respondent.respondent.uid)
                .then(result => {
                    this.setState({
                        ...this.state,
                        chat: result
                    });
                });
        }
    }

    startRecording() {
        navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
        }).then(async function (stream) {
            window.streamReference = stream;
            let recorder = RecordRTC(stream, {
                type: 'audio'
            });
            this.setState({
                ...this.state,
                recorder: recorder
            }, () => this.state.recorder.startRecording());
        }.bind(this));
    }

    stopRecording(recorder, requester, respondent) {
        recorder.stopRecording(function () {
            let blob = recorder.getBlob();
            let reader = new FileReader();
            reader.onload = function (event) {
                let contentType = blob.type && blob.type.includes(';') ? blob.type.split(';')[0] : blob.type;
                fileService.upload(event.target.result, contentType)
                    .then((filename) => {
                        chatService.send(requester, respondent, filename, contentType)
                        recorder.destroy();
                    });
            };
            reader.readAsArrayBuffer(blob);
        });
        this.setState({
            ...this.state,
            recorder: undefined
        }, () => {
            if (!window.streamReference) return;
            window.streamReference.getAudioTracks().forEach((track) => track.stop());
            window.streamReference = null;
        });
    }

    render() {
        return (
            <div className='secure-container' style={{ visibility: this.state.chat ? 'visible' : 'hidden' }}>
                {this.state.recorder === undefined &&
                    <i className="pi pi-microphone clickable" style={{ fontSize: '2.5rem', width: '1em' }} 
                        onClick={() => this.startRecording()}></i>
                }
                {this.state.recorder &&
                    <i className="pi pi-stop-circle clickable" style={{ fontSize: '2.5rem', width: '1em' }} 
                        onClick={() => this.stopRecording(this.state.recorder, authService.get(), this.state.chat.respondent.uid)}></i>
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    chat: state.chat
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recorder));