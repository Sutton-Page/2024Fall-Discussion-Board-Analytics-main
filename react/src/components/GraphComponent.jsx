import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import ReactDOM from "react-dom";
import UserIcon from "../components/UserIcon.jsx";
import UserPostsPage from "../pages/UserPostsPage.jsx"; // Adjust the path as needed

const D3GraphComponent = ({ nodes, links, boardId, onNodeClick }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [popupData, setPopupData] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    svg.selectAll("*").remove(); // Clear previous content

    const width = dimensions.width;
    const height = dimensions.height;

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg.append("g");

    // Find isolated nodes (nodes with no connections)
    const connectedNodeIds = new Set();
    links.forEach((link) => {
      connectedNodeIds.add(link.source.id || link.source);
      connectedNodeIds.add(link.target.id || link.target);
    });

    // Filter out isolated nodes for simulation
    const simulatedNodes = nodes.filter((node) =>
      connectedNodeIds.has(node.id)
    );
    const isolatedNodes = nodes.filter(
      (node) => !connectedNodeIds.has(node.id)
    );

    // Position isolated nodes
    const isolatedNodeSpacing = 100; // Adjust spacing as needed
    let isolatedIndex = 0;

    isolatedNodes.forEach((node) => {
      node.x = 150 + (isolatedIndex % 5) * isolatedNodeSpacing; // Spread in x direction
      node.y = 100 + Math.floor(isolatedIndex / 5) * isolatedNodeSpacing; // Spread in y direction
      isolatedIndex++;
    });

    const simulation = d3
      .forceSimulation(simulatedNodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 3, height / 3));

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(0,0,0,0.5)")
      .attr("stroke-width", 2);

    // Create nodes for connected nodes
    const connectedNode = g
      .append("g")
      .selectAll("foreignObject")
      .data(simulatedNodes)
      .join("foreignObject")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", (d) => d.x - 25)
      .attr("y", (d) => d.y - 25)
      .each(function (d) {
        ReactDOM.render(
          <UserIcon img={d.img} name={d.name} color={d.color} size={50} />,
          this
        );
      })
      .on("click", (event, d) => {
        handleNodeClick(d);
      })
      .call(drag(simulation));

    // Create nodes for isolated nodes
    const isolatedNode = g
      .append("g")
      .selectAll("foreignObject")
      .data(isolatedNodes)
      .join("foreignObject")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", (d) => d.x - 25)
      .attr("y", (d) => d.y - 25)
      .each(function (d) {
        ReactDOM.render(
          <UserIcon img={d.img} name={d.name} color={d.color} size={50} />,
          this
        );
      })
      .on("click", (event, d) => {
        handleNodeClick(d);
      });

    const handleNodeClick = (node) => {
      console.log("Node clicked:", node);
      if (onNodeClick) {
        console.log("Calling onNodeClick with node ID:", node.id);
        onNodeClick(node.id);
      }
    };

    const label = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("font-size", 12)
      .attr("dx", 25)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      connectedNode.attr("x", (d) => d.x - 25).attr("y", (d) => d.y - 25);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    function drag(simulation) {
      return d3
        .drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = d.x;
          d.fy = d.y;
        });
    }

    return () => simulation.stop();
  }, [nodes, links, dimensions, boardId]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 217,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (popupData) {
      console.log("Popup Data:", popupData);
    }
  }, [popupData]);

  const handlePopupClose = () => {
    setPopupData(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
      {popupData && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            maxWidth: "80%",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <UserPostsPage
            studentId={popupData.studentId}
            boardId={parseInt(popupData.boardId)}
          />
          <button
            onClick={handlePopupClose}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default D3GraphComponent;
