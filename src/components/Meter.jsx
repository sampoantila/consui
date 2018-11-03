import React, { Component } from 'react';
import service from '../services/consumptionService';

class Meter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "-",
            time: null,
            refreshTime: []
        }
        this.interval = [];
    }

    componentWillMount() {
        this.loadLatest();
        this.interval = setInterval(() => {
            this.loadLatest();
            this.setState({ refreshTime: Date.now() })
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadLatest() {
        service.latest(this.props.meterId)
        .then((response) => {
            this.setState(response.data);
        });
    }

    render() {
        return <div className="meter">
            <div style={{color: 'lightgray', fontSize: 20}}>Mittari {this.props.meterId}</div>
            <div style={{margin: 10, fontSize: 40, color: 'white'}}>{parseFloat(this.state.value).toFixed(1)}&deg; C</div>        
            <div>{this.state.time === null ? "-" : new Date(this.state.time).toLocaleString('fi-fi')}</div>
        </div>;
    }
}

export default Meter;
