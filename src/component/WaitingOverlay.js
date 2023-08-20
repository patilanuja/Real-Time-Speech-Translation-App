import React from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import './WaitingOverlay.css'

export default class Overlay extends React.Component {
    render() {
        return (
            <div className='overlay'>
                <ProgressSpinner strokeWidth='6' animationDuration='5s' />
            </div>
        )
    }
}