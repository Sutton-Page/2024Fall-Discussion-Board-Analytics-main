import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "../styles/dashboard.css";
import "../styles/grade-page.css";
import axios from "axios";

/**
 * Renders a pie chart using the Plotly.js library.
 *
 * @param {object} props - The component props.
 * @param {string[]} props.labels - The labels for the pie chart slices.
 * @param {string[]} props.label_colors - The colors for the pie chart slices.
 * @param {number[]} props.data - The data values for the pie chart slices.
 * @returns {JSX.Element} - The rendered pie chart.
 */
function CreatePie({ labels, label_colors, data }) {
  return (
    <Plot
      data={[
        {
          type: "pie",
          values: data,
          labels: labels,
          marker: { colors: label_colors },
          textinfo: "label+percent",
          insidetextorientation: "radial",
        },
      ]}
      layout={{
        width: 300,
        height: 300,
        showlegend: true,
        legend: {
          orientation: "h",
          x: 0.5,
          xanchor: "center",
          y: -0.2,
        },
        margin: { t: 70, b: 0, l: 0, r: 0 },
      }}
    />
  );
}

/**
 * Renders a bar chart using the Plotly.js library.
 *
 * @param {object} props - The component props.
 * @param {string} props.chart_label - The label for the chart.
 * @param {string} props.y_axis_label - The label for the y-axis.
 * @param {string[]} props.item_labels - The labels for the bar items.
 * @param {string} props.bar_color - The color for the bars.
 * @param {number[]} props.data - The data values for the bars.
 * @returns {JSX.Element} - The rendered bar chart.
 */
function CreateBar({
  chart_label,
  y_axis_label,
  item_labels,
  bar_color,
  data,
}) {
  return (
    <Plot
      data={[
        {
          type: "bar",
          x: item_labels,
          y: data,
          marker: { color: bar_color },
        },
      ]}
      layout={{
        width: "100%",
        height: 300,
        title: { text: chart_label, font: { size: 16 } },
        yaxis: {
          title: { text: y_axis_label },
          automargin: true,
        },
        xaxis: {
          tickangle: -45,
          automargin: true,
        },
        bargap: 0.2,
        margin: { t: 50, b: 40, l: 40, r: 20 },
      }}
    />
  );
}

function Dash({ metrics }) {
  const [sentimentData, setSentimentData] = useState([0, 0, 0]);
  const [avgWordCount, setAvgWordCount] = useState(0);

  const [currentBoard, setCurrentBoard] = useState(0);
  const [boardData, setBoardData] = useState([]);

  var rootUrl = "http://localhost:5000/db-wordcloud?boardId=";

  const [wordCloudUrl, setWordCloudUrl] = useState("");

  /**
   * Retrieves sentiment data for the current discussion board.
   *
   * This function makes an asynchronous GET request to the server at `http://localhost:5000/db-sentiment?boardId={currentBoard}` to retrieve sentiment data for the current discussion board. The sentiment data includes the positive, negative, and neutral sentiment values.
   *
   * The retrieved sentiment data is then used to update the `sentimentData` state variable.
   */
  const getSentiment = async () => {
    axios
      .get(
        "http://localhost:5000/db-sentiment?boardId=" + currentBoard.toString()
      )
      .then((response) => {
        const data = response.data;

        var values = Object.values(data["boards"]);
        const { positive, negative, neutral } = values[0];
        setSentimentData([positive, negative, neutral]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Retrieves the list of discussion boards from the server.
   *
   * This function makes an asynchronous GET request to the server at `http://localhost:8888/discussions` to retrieve the list of discussion boards. The retrieved data is then stored in the `boardData` state variable using the `setBoardData` function.
   */
  const retrieveBoards = async () => {
    axios.get("http://localhost:8888/discussions").then((response) => {
      const data = response.data;
      console.log(data);
      setBoardData(data);
    });
  };

  /**
   * Handles the side effects when the `currentBoard` state changes.
   *
   * This useEffect hook is triggered whenever the `currentBoard` state changes. It performs the following actions:
   *
   * 1. Calls the `getSentiment()` function to retrieve the sentiment data for the current discussion board.
   * 2. Calls the `retrieveBoards()` function to retrieve the list of discussion boards.
   * 3. Updates the `wordCloudUrl` state variable with the URL for the word cloud data based on the current board ID.
   */
  useEffect(() => {
    getSentiment();
    retrieveBoards();

    setWordCloudUrl(rootUrl + currentBoard);
  }, [currentBoard]);

  const interaction_labels = metrics.interactions.map((item) => item.user);
  const interaction_data = metrics.interactions.map(
    (item) => item.interactions
  );
  const sentiment_labels = ["positive", "negative", "neutral"];
  const label_colors = ["#ffa500", "#ff6347", "#d3d3d3"];
  const views_labels = metrics.views.map((item) => item.name);
  const view_data = metrics.views.map((item) => item.views);

  return (
    <div className="container">
      <header className="top-content">
        <h1>Analytics Page</h1>
        {/**
         * Renders a dropdown select element for choosing a discussion board.
         *
         * This component allows the user to select a discussion board from a list of available boards. The selected board ID is stored in the `currentBoard` state variable, which is updated when the user makes a selection.
         *
         * @returns {JSX.Element} A JSX element representing the discussion board selector.
         */}
        <div className="board-selector">
          <label htmlFor="board">Select Discussion Board:</label>
          <select
            id="board"
            name="board"
            value={currentBoard}
            onChange={(e) => setCurrentBoard(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Board --
            </option>
            {boardData.map((board) => {
              return (
                <option key={board.boardId} value={board.boardId}>
                  {board.name}
                </option>
              );
            })}
          </select>
        </div>
      </header>

      {/* Top Row with Metrics, Pie Chart, and Wordcloud */}
      <div className="top-row-container">
        <div className="metrics">
          {/* This section of the code renders the "Most replied to post" and "Most viewed post" metrics, as well as the average word count per post. The "Most replied to post" and "Most viewed post" sections display the profile picture and name of the corresponding post. If the profile picture is not available, a default placeholder image is used. The average word count per post is also displayed.*/}
          <div className="profile-pic-ring">
            <img
              src={
                metrics.mostRepliedPost.profilePic || "default-placeholder.jpg"
              }
              alt="Most replied to post"
              className="profile-pic"
              onError={(e) => {
                e.target.src = "default-placeholder.jpg";
              }}
            />
          </div>
          <p>Most replied to post: {metrics.mostRepliedPost.name}</p>

          {/* Most Viewed Post */}
          <div className="profile-pic-ring">
            <img
              src={
                metrics.mostViewedPost.profilePic || "default-placeholder.jpg"
              }
              alt="Most viewed post"
              className="profile-pic"
              onError={(e) => {
                e.target.src = "default-placeholder.jpg";
              }}
            />
          </div>
          <p>Most viewed post: {metrics.mostViewedPost.name}</p>

          <br></br>

          <p>Average word count per post: {avgWordCount} words</p>
        </div>

        {/*This component renders a pie chart visualization based on the `sentiment_labels` and `sentimentData` props. The pie chart is used to display sentiment data, with each slice representing a different sentiment label and the size of the slice proportional to the corresponding sentiment data value.*/}
        <div className="chart-container square-box">
          <CreatePie
            labels={sentiment_labels}
            data={sentimentData}
            label_colors={label_colors}
          />
        </div>

        {/*This component renders a word cloud visualization based on the `wordCloudUrl` prop. If the `wordCloudUrl` is provided, it displays an image of the word cloud. Otherwise, it shows a "Loading Word Cloud..." message.*/}
        <div className="chart-container square-box word-cloud-placeholder">
          {wordCloudUrl ? (
            <img
              src={wordCloudUrl}
              alt="Word Cloud"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          ) : (
            <p>Loading Word Cloud...</p>
          )}
        </div>
      </div>

      {/*Renders a bar chart component that displays the total interactions (views + replies) per post.*/}
      <div className="chart-container full-width">
        <CreateBar
          chart_label="Interactions per Post (Views + Replies)"
          y_axis_label="Total Interactions"
          item_labels={interaction_labels}
          data={interaction_data}
          bar_color="orange"
        />
      </div>

      {/*Renders a bar chart component that displays the views per post."*/}
      <div className="chart-container full-width">
        <CreateBar
          chart_label="Views per Post"
          y_axis_label="Views"
          item_labels={views_labels}
          data={view_data}
          bar_color="lightblue"
        />
      </div>
    </div>
  );
}

export default Dash;
