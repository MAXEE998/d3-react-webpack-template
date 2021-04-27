import React from "react";
import * as d3 from "d3"

function SymmetricBarChart(props) {
    const {x, y, data, height, width, selectedStation, setSelectedStation} = props;
    const xScale = d3.scaleBand().range([0, width])
        .domain(data.map(d => d.station))
    const yScale1 = d3.scaleLinear().range([height / 2, 0])
        .domain([0, d3.max(data, d => d.start > d.end ? d.start : d.end)])
        .nice();
    const yScale2 = d3.scaleLinear().range([0, height / 2])
        .domain([0, d3.max(data, d => d.start > d.end ? d.start : d.end)])
        .nice();
    const getColor1 = (selectedStation, station) => {
        return selectedStation && station === selectedStation ? "red" : "#99d594";
    };
    const getColor2 = (selectedStation, station) => {
        return selectedStation && station === selectedStation ? "steelblue" : "#fc8d59";
    };
    return <g transform={`translate(${x}, ${y})`}>
        {<line y2={height / 2} stroke='black'/>}
        {yScale1.ticks(5).map(tickValue =>
            <g key={tickValue + "up"} transform={`translate(-10, ${yScale1(tickValue)})`}>
                <line x2={10} stroke='black'/>
                <text style={{textAnchor: 'end', fontSize: '10px'}}>
                    {tickValue}
                </text>
            </g>
        )}
        {data.map(d =>
            <rect key={d.station + "barUp"} x={xScale(d.station)} y={yScale1(d.start)}
                  width={xScale.bandwidth()} height={height / 2 - yScale1(d.start)} stroke="black"
                  fill={getColor1(selectedStation, d.station)}
                  onMouseEnter={() => setSelectedStation(d.station)}
                  onMouseOut={() => setSelectedStation(null)}/>
        )}
        <text style={{textAnchor: 'start', fontSize: '15px'}} transform={`translate(${width / 3}, 0)`}>
            {"Num. of ridders start from a station"}
        </text>
        <g transform={`translate(${0}, ${height / 2})`}>
            {data.map(d =>
                <rect key={d.station + "barDown"} x={xScale(d.station)} y={0}
                      width={xScale.bandwidth()} height={yScale2(d.end)} stroke="black"
                      fill={getColor2(selectedStation, d.station)}
                      onMouseEnter={() => setSelectedStation(d.station)}
                      onMouseOut={() => setSelectedStation(null)}/>
            )}
            {<line y2={height / 2} stroke='black'/>}
            {yScale2.ticks(5).reverse().map(tickValue =>
                <g key={tickValue + "down"} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black'/>
                    <text style={{textAnchor: 'end', fontSize: '10px'}}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{textAnchor: 'start', fontSize: '15px'}}
                  transform={`translate(${width / 3}, ${height / 2 + 10})`}>
                {"Num. of ridders end into a station"}
            </text>
        </g>
    </g>
}

export {SymmetricBarChart};