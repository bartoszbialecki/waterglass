import { openDialog } from "./dialog";
import * as d3 from "d3";

const OPEN_HISTORY_BUTTON_SELECTOR = ".history-button--js";
const HISTORY_DIALOG_SELECTOR = "#history";
const HISTORY_TABLE_SELECTOR = ".history__table--js";
const HISTORY_CHART_SELECTOR = ".history__graph--js";

const openHistoryButton = document.querySelector(OPEN_HISTORY_BUTTON_SELECTOR);
const historyDialog = document.querySelector(HISTORY_DIALOG_SELECTOR);
const historyTable = document.querySelector(HISTORY_TABLE_SELECTOR);
const historyTableBody = historyTable.querySelector("tbody");

const graphDaysCount = 30; // how many days will be shown on the graph

openHistoryButton.addEventListener("click", () => {
  openDialog(historyDialog);
});

export const insertGlassInfoToTable = (date, numberOfGlasses) => {
  const row = historyTableBody.insertRow(0);
  const dateCell = row.insertCell(0);
  const glassesCell = row.insertCell(1);
  dateCell.innerHTML = new Date(date).toLocaleDateString();
  glassesCell.innerHTML = numberOfGlasses;
};

export const updateGlassInfoInTable = (date, numberOfGlasses) => {
  const count = historyTableBody.rows.length;

  for (let i = 0; i < count; i++) {
    const row = historyTableBody.rows[i];

    if (row.cells[0].textContent === new Date(date).toLocaleDateString()) {
      row.cells[1].textContent = numberOfGlasses;
      break;
    }
  }
};

export const fillHistoryTable = (db) => {
  db.forEach((item) => insertGlassInfoToTable(item.date, item.glasses));
};

export const drawHistoryGraph = (db) => {
  const margin = 70;
  const width = 1000;
  const height = 400;

  const data = db.slice(-graphDaysCount).map((item) => {
    return {
      ...item,
      date: new Date(item.date).toLocaleDateString(),
    };
  });

  document.querySelector(HISTORY_CHART_SELECTOR).innerHTML = "";

  const svg = d3
    .select(HISTORY_CHART_SELECTOR)
    .style("width", "100%")
    .attr("viewBox", `0 0 ${width + margin} ${height}`);

  const chart = svg.append("g").attr("transform", `translate(${margin}, 0)`);

  const yScale = d3
    .scaleLinear()
    .range([height - 2 * margin, 0])
    .domain([0, 25]);

  chart.append("g").style("font-size", "18px").call(d3.axisLeft(yScale));

  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("fill", "#334e63")
    .style("font-size", "16px")
    .attr("x", -210)
    .attr("y", -50)
    .text("Number of glasses");

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map((item) => {
        return item.date;
      })
    )
    .padding(0.2);

  chart
    .append("g")
    .attr("transform", `translate(0, ${height - 2 * margin})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(0, 10) rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", 18);

  chart
    .append("text")
    .attr("fill", "#334e63")
    .style("font-size", "14px")
    .attr("x", 415)
    .attr("y", 370)
    .text(`Last ${graphDaysCount} results`);

  chart
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "#334e63")
    .attr("x", (s) => xScale(s.date))
    .attr("y", (s) => yScale(s.glasses))
    .attr("height", (s) => height - 2 * margin - yScale(s.glasses))
    .attr("width", xScale.bandwidth());
};
