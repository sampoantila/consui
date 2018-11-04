import React, { Component } from 'react';

class Meter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false
        }
        this.interval = [];
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({ on: !this.state.on }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        var blinkClass = "blinkOff";

        if (this.state.on) {
            blinkClass = "blinkOn";
        }

        return <div className="meter">
            <div className={blinkClass}></div>
            <div className="meterLabel">Mittari {this.props.meterId}</div>
            <div className="meterValueLabel">{parseFloat(this.props.data.value).toFixed(1)}&deg; C</div>        
            <div>{this.props.data.time === null ? "-" : new Date(this.props.data.time).toLocaleString('fi-fi')}</div>
        </div>;
    }
}

export default Meter;
