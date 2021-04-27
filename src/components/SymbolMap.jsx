import React from "react"
import * as d3 from "d3"

function SymbolMap(props) {
    const {x, y, map, data, height, width, selectedStation, setSelectedStation} = props;
    // const { map:{land, interiors}, stations } = props;
    const projection = d3.geoMercator().fitSize([width, height], map);
    const path = d3.geoPath(projection);
    const radius = d3.scaleLinear().range([2, 20])
        .domain([d3.min(data, d => d.popularity), d3.max(data, d => d.popularity)]);
    const getColor = (selectedStation, station) => {
        return selectedStation && station === selectedStation ? "steelblue" : "red";
    }
    //console.log(d3.max(data, d => d.start));
    return <g transform={`translate(${x}, ${y})`}>
        {map.features.map((feature, idx) => {
            // console.log(feature.id);
            return <path key={idx + "boundary"} className={"boundary"} d={path(feature)}/>
        })}
        {data.map(d => {
            const [x, y] = projection([d.longitude, d.latitude]);
            // console.log(d.longitude, x, d.latitude, y);
            return <circle key={"station" + d.longitude + d.latitude} cx={x} cy={y} r={radius(d.popularity)}
                           opacity={0.7} stroke={"black"}
                           fill={getColor(selectedStation, d.station)}
                           onMouseEnter={(event) => {
                               setSelectedStation(d.station);
                           }}
                           onMouseOut={() => {
                               setSelectedStation(null);
                           }}/>
        })}
    </g>
}

export {SymbolMap};