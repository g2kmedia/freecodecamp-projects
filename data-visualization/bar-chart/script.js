import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const getData = async () => {
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

getData().then(data => {
  if (data.length === 0) {
    return console.error("No data available for chart creation.");
  }

  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 40;
  const marginBottom = 30;
  const marginLeft = 40;

  const x = d3.scaleUtc()
    .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
    .domain([0, data[data.length - 1][1]])
    .range([height - marginBottom, marginTop]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  const tooltip = d3.select("#tooltip");

  svg.append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(new Date(d[0])))
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(0) - y(d[1]))
    .attr("width", (width - marginLeft - marginRight) / data.length)
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .html(`Date: ${d[0]}<br>GDP: $${d[1]} Billion`)
        .attr("data-date", d[0]); // Required for the `tooltip` element
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3.axisBottom(x)
        .ticks(d3.timeYear.every(5))
        .tickFormat(d3.timeFormat("%Y"))
    );

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", marginTop / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text("United States GDP (1947-2015)");

  const container = d3.select("#container");
  container.append(() => svg.node());
});