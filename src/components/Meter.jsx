import React, { Component } from 'react';
import service from '../services/consumptionService';

class Meter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "-",
            time: null,
            refreshTime: [],
            on: false
        }
        this.interval = [];
        this.interval2 = [];
    }

    componentWillMount() {
        this.loadLatest();
        this.interval = setInterval(() => {
            this.loadLatest();
            this.setState({ refreshTime: Date.now() })
        }, 10000);
        this.interval2 = setInterval(() => this.setState({ on: !this.state.on }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
    }

    loadLatest() {
        service.latest(this.props.meterId)
        .then((response) => {
            this.setState(response.data);
        });
    }

    render() {
        return <div className="meter">
            <div>{this.state.on
            ? <div style={{position: 'relative', left: 10, width: 7, height: 7, borderRadius: 4, backgroundColor: 'cyan'}}></div>
            :  <div style={{position: 'relative', left: 10, width: 7, height: 7, borderRadius: 4, backgroundColor: 'transparent'}}></div>
             }</div>
            <div style={{color: 'lightgray', fontSize: 20}}>Mittari {this.props.meterId}</div>
            <div style={{margin: 10, fontSize: 40, color: 'white'}}>{parseFloat(this.state.value).toFixed(1)}&deg; C</div>        
            <div>{this.state.time === null ? "-" : new Date(this.state.time).toLocaleString('fi-fi')}</div>
        </div>;
    }
}

export default Meter;
