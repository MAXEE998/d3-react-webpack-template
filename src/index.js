import "./styles.css"
import React from "react"
import * as ReactDOM from "react-dom";
import {SymbolMap} from "./components/SymbolMap";
import {Tooltip} from "./components/Tooltip";
import {SymmetricBarChart} from "./components/SymmerticBarChart"
import {MONTHS, csvUrl, mapUrl, WIDTH, HEIGHT, margin, innerHeight, innerWidth} from "./constants"
import {useMap, useData} from "./utils";

const CitiBike = () => {
    const [month, setMonth] = React.useState('4');
    const [selectedStation, setSelectedStation] = React.useState(null);
    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);
    if (!map || !dataAll) {
        return <pre>Loading...</pre>;
    }

    const data = dataAll.filter(d => {
        return d.month === MONTHS[month];
    });
    const stationYearData = dataAll.filter(d => {
        return d.station === selectedStation;
    });
    // console.log(stations);
    const changeHandler = (event) => {
        setMonth(event.target.value);
    }
    const selectedPoint = dataAll.filter(d => d.station === selectedStation)[0];
    console.log(stationYearData.map(d => d.popularity));

    return <div>
        <div>
            <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
            <input key="monthText" type="text" value={MONTHS[month]} readOnly/>
        </div>
        <svg width={WIDTH} height={HEIGHT}>
            <g>
                <SymbolMap x={margin.left} y={margin.top} height={innerHeight + margin.gap}
                           width={innerWidth / 2} data={data} map={map} selectedStation={selectedStation}
                           setSelectedStation={setSelectedStation}/>
                <SymmetricBarChart x={margin.left + innerWidth / 2} y={margin.top} data={data} height={innerHeight / 2}
                                   width={innerWidth / 2}
                                   selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
            </g>
            <Tooltip d={selectedPoint} stationYearData={stationYearData} left={innerWidth / 2 + margin.gap}
                     top={margin.top + 80 + innerHeight / 2}
                     height={innerHeight / 2} width={innerWidth / 2}/>
        </svg>
        <div style={{position: "absolute", textAlign: "left", width: "240px", left: "40px", top: "40px"}}>
            <h3>Citi bike 2020</h3>
            <p>A visualization of the numbers of citi bike riders over 2020.</p>
        </div>

    </div>
}


ReactDOM.render(<CitiBike/>, document.getElementById('root'));