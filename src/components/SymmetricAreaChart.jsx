import React from "react"
import * as d3 from "d3"
import {MONTHS} from "../constants";

function SymmetricAreaChart(props) {
    const {offsetX, offsetY, data, height, width, attr1, attr2} = props;
    const xScale = d3.scaleBand().range([0, width])
        .domain(MONTHS);
    const yScale1 = d3.scaleLinear().range([height / 2, 0]).domain([0, d3.max(data, d => d[attr1])]);
    const yScale2 = d3.scaleLinear().range([0, height / 2]).domain([0, d3.max(data, d => d[attr1])]);
    // console.log(d3.max(data, d => d[attr]));
    const p1 = d3.area().x(d => xScale(d.month)).y0(height / 2).y1(d => yScale1(d[attr1])).curve(d3.curveBasis)(data);
    const p2 = d3.area().x(d => xScale(d.month)).y0(0).y1(d => yScale2(d[attr2])).curve(d3.curveBasis)(data);

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {xScale.domain().map(tickValue =>
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height + 5})`}>
                <line y2={10} stroke='black'/>
                <text style={{textAnchor: 'middle', fontSize: '10px'}} y={20}>
                    {tickValue}
                </text>
            </g>
        )}
        <path d={p1} fill={"lightgreen"} stroke={"black"}/>
        {<line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke='black'/>}
        {<line y2={height / 2} stroke='black'/>}
        {yScale1.ticks(3).map(tickValue =>
            <g key={tickValue} transform={`translate(-10, ${yScale1(tickValue)})`}>
                <line x2={10} stroke='black'/>
                <text style={{textAnchor: 'end', fontSize: '10px'}}>
                    {tickValue}
                </text>
            </g>
        )}
        <text style={{textAnchor: 'end', fontSize: '15px'}} transform={`translate(${width}, ${20})rotate(0)`}>
            {attr1}
        </text>
        <text style={{textAnchor: 'end', fontSize: '15px'}} transform={`translate(${width * 2 / 3}, ${-10})rotate(0)`}>
            {"Num. of riders over the year"}
        </text>
        <g transform={`translate(${offsetX}, ${offsetY + height / 2})`}>
            <path d={p2} fill={"pink"} stroke={"black"}/>
            {<line y2={height / 2} stroke='black'/>}
            {yScale2.ticks(3).map(tickValue =>
                <g key={tickValue} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black'/>
                    <text style={{textAnchor: 'end', fontSize: '10px'}}>
                        {tickValue}
                    </text>
                </g>
            )}
            <text style={{textAnchor: 'end', fontSize: '15px'}}
                  transform={`translate(${width}, ${height / 2 - 20})rotate(0)`}>
                {attr2}
            </text>
        </g>
    </g>
}

export {SymmetricAreaChart};