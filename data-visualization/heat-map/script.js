import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const getData = async () => {
  const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

getData().then((data) => {
  if (data.length === 0) {
    return console.error("No data available for chart creation.");
  }

  const width = 928;
  const height = 500;
  const marginTop = 50;
  const marginRight = 40;
  const marginBottom = 100;
  const marginLeft = 60;

  const years = data.monthlyVariance.map((item) => item.year);
  const oldestYear = Math.min(...years);
  const latestYear = Math.max(...years);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const getMonthName = (monthNumber) => monthNames[monthNumber - 1];

  const x = d3
    .scaleLinear()
    .domain([oldestYear, latestYear])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleBand()
    .domain(monthNames)
    .range([marginTop, height - marginBottom])
    .padding(0.05);

  const colorScale = d3
    .scaleLinear()
    .domain([
      data.baseTemperature + d3.min(data.monthlyVariance, (d) => d.variance), // min(temperature)
      data.baseTemperature, // baseTemperature (neutral point)
      data.baseTemperature + d3.max(data.monthlyVariance, (d) => d.variance) // max(temperature)
    ])
    .range(["blue", "white", "red"]);

  const svg = d3.create("svg").attr("width", width).attr("height", height);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat((d) => Number(d)));

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  svg
    .append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", marginTop / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Monthly Global Land-Surface Temperature");

  svg
    .append("text")
    .attr("id", "description")
    .attr("x", width / 2)
    .attr("y", marginTop)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("1753 - 2015: base temperature 8.66℃");

  svg
    .selectAll(".cell")
    .data(data.monthlyVariance)
    .join("rect")
    .attr("class", "cell")
    .attr("x", (d) => x(d.year))
    .attr("y", (d) => y(getMonthName(d.month)))
    .attr(
      "width",
      (width - marginLeft - marginRight) / (latestYear - oldestYear + 1)
    )
    .attr("height", y.bandwidth())
    .attr("fill", (d) => colorScale(data.baseTemperature + d.variance))
    .attr("data-year", (d) => d.year)
    .attr("data-month", (d) => d.month - 1)
    .attr("data-temp", (d) => data.baseTemperature + d.variance)
    .on("mouseover", (event, d) => {
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("visibility", "visible")
        .attr("data-year", d.year)
        .html(
          `${getMonthName(d.month)} ${d.year}<br>Temperature: ${(
            data.baseTemperature + d.variance
          ).toFixed(2)}℃<br>Variance: ${d.variance.toFixed(2)}`
        )
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  const legendWidth = 300;
  const legendHeight = 20;

  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr(
      "transform",
      `translate(${marginLeft}, ${height - marginBottom + 40})`
    );

  legend
    .append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .selectAll("stop")
    .data(d3.range(0, 1, 1 / 8))
    .join("stop")
    .attr("offset", (d) => `${d * 100}%`)
    .attr("stop-color", (d) =>
      colorScale(
        data.baseTemperature +
        d3.min(data.monthlyVariance, (d) => d.variance) +
        d *
        (d3.max(data.monthlyVariance, (d) => d.variance) -
          d3.min(data.monthlyVariance, (d) => d.variance))
      )
    );

  legend
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legend-gradient)");

  legend
    .selectAll(".legend-text")
    .data(d3.range(0, 1, 1 / 8))
    .join("text")
    .attr("x", (d) => d * legendWidth)
    .attr("y", legendHeight + 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text((d) => {
      const temp =
        data.baseTemperature +
        d3.min(data.monthlyVariance, (d) => d.variance) +
        d *
        (d3.max(data.monthlyVariance, (d) => d.variance) -
          d3.min(data.monthlyVariance, (d) => d.variance));
      return temp.toFixed(1);
    });

  const container = d3.select("#container");
  container.append(() => svg.node());
});
