import React, { Component } from 'react';
import Meter from './Meter';
import MeterDiff from './MeterDiff';
import service from '../services/consumptionService';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meterData1: [],
            meterData2: [],
            refreshTime: []
        }
        this.interval = [];
    }

    componentWillMount() {
        this.loadLatest();
        this.interval = setInterval(() => {
            this.loadLatest();
            this.setState({ refreshTime: Date.now() })
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadLatest() {
        service.latest(1)
        .then((response) => {
            this.setState({
                meterData1: response.data
              });
        });
        service.latest(2)
        .then((response) => {
            this.setState({
                meterData2: response.data
              });
        });
    }

    render() {
        return <div>
            <div className="meterGroup">
                <Meter meterId="1" data={this.state.meterData1} />
                <Meter meterId="2" data={this.state.meterData2} />
                <br/>
                <MeterDiff data1={this.state.meterData1} data2={this.state.meterData2} />
            </div>
        </div>;
    }
}

export default Content;
