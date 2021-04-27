import React from "react"
import {SymmetricAreaChart} from "./SymmetricAreaChart"

function Tooltip(props) {
    const {d, stationYearData, left, top, height, width} = props;
    //console.log(d);
    if (!d) {
        return <g></g>;
    } else {
        return <g transform={`translate(${left}, ${top})`}>
            <text style={{textAnchor: 'start', fontSize: '15px'}}
                  transform={`translate(${0}, ${-5})rotate(0)`}>{d.station} </text>
            <SymmetricAreaChart offsetX={0} offsetY={0} height={height / 2}
                                width={width} data={stationYearData} attr1={'start'} attr2={'end'}/>
        </g>
    }
}

export {Tooltip};