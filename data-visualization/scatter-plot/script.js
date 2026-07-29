import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const getData = async () => {
  const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

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
  const marginTop = 30;
  const marginRight = 40;
  const marginBottom = 30;
  const marginLeft = 40;

  const years = data.map((item) => item.Year);
  const oldestYear = Math.min(...years);
  const latestYear = Math.max(...years);

  const toSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const timesInSeconds = data.map((item) => toSeconds(item.Time));

  const shortestTime = Math.min(...timesInSeconds);
  const longestTime = Math.max(...timesInSeconds);

  const x = d3
    .scaleLinear()
    .domain([oldestYear - 1, latestYear + 1])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([longestTime + 5, shortestTime - 5])
    .range([height - marginBottom, marginTop]);


  const svg = d3.create("svg").attr("width", width).attr("height", height);

  // Convert Time to Minutes using a Date object for the QA test
  const toMinutes = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date(0);

    // Set minutes and seconds
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
  };

  const tooltip = d3.select("#tooltip");

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.Year))
    .attr("cy", (d) => y(toSeconds(d.Time)))
    .attr("r", 5)
    .attr("fill", (d) => {
      if (d.Doping === "") {
        return "orange";
      } else {
        return "steelblue";
      }
    })
    .style("stroke", "black")
    .style("stroke-width", 0.5)
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => toMinutes(d.Time))
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .html(
          `${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}<br><br>${d.Doping}`
        )
        .attr("data-year", d.Year); // Required for the `tooltip` element
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat((d) => Number(d)));

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(
      d3
        .axisLeft(y)
        .ticks(10)
        .tickFormat((d) => {
          const date = new Date(0); // convert to Date Object for QA test
          date.setSeconds(d);
          return d3.timeFormat("%M:%S")(date);
        })
    );

  svg
    .append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", marginTop / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Doping in Professional Bicycle Racing");

  const colorScale = d3
    .scaleOrdinal()
    .domain(["no doping", "doping"])
    .range(["orange", "steelblue"]);

  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${width - marginRight - 160}, ${marginTop})`);

  legend
    .selectAll("rect")
    .data(colorScale.domain())
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", colorScale);

  legend
    .selectAll("text")
    .data(colorScale.domain())
    .enter()
    .append("text")
    .attr("x", 25)
    .attr("y", (d, i) => i * 20 + 9)
    .attr("dy", ".35em")
    .text((d) =>
      d === "no doping" ? "No Doping Alligations" : "Doping Alligations"
    );

  const container = d3.select("#container");
  container.append(() => svg.node());
});
