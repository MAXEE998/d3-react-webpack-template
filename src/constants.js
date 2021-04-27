const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv';
const mapUrl = "https://gist.githubusercontent.com/hogwild/6784f0d85e8837b9926c184c65ca8ed0/raw/2040d6883cf822817e34b5bda885348ec6214572/jerseyCity_geojson.json";
const WIDTH = 1200;
const HEIGHT = 800;
const margin = {top: 20, right: 40, bottom: 160, left: 40, gap: 40};
const innerWidth = WIDTH - margin.left - margin.right - margin.gap;
const innerHeight = HEIGHT - margin.top - margin.bottom - margin.gap;

export {MONTHS, csvUrl, mapUrl, WIDTH, HEIGHT, margin, innerHeight, innerWidth}