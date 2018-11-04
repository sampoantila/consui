import React, { Component } from 'react';

class MeterDiff extends Component {
    
    render() {

        var diff = 0.0;
        
        if (this.props.data1 && this.props.data2) {
            diff = this.props.data1.value - this.props.data2.value;
        }

        var colorClass = " noDiff";

        if (diff < 0) {
            colorClass = " negativeDiff";
        }
        else if (diff > 0) {
            colorClass = " positiveDiff";
        }

        return <div className="meter meterdiff">
            <div className="meterLabelDiff">Erotus</div>
            <div className={"meterValueLabel" + colorClass}>
                {parseFloat(diff).toFixed(1)}&deg; C
            </div>
        </div>;
    }
}

export default MeterDiff;