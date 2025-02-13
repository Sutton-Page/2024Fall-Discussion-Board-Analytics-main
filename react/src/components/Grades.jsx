import { useState, useEffect } from "react";
import icon from "/default_picture.png";

import "../components/UserIcon";
import UserIcon from "../components/UserIcon";

/**
 * Compares two objects with a `score` property and returns a value indicating their relative order.
 *
 * This function is used to sort an array of objects with a `score` property in descending order.
 *
 * @param {Object} a - The first object to compare.
 * @param {number} a.score - The score property of the first object.
 * @param {Object} b - The second object to compare.
 * @param {number} b.score - The score property of the second object.
 * @returns {number} - A negative value if `a.score` is greater than `b.score`, a positive value if `a.score` is less than `b.score`, and zero if they are equal.
 */
function scoreOrderDesc(a, b) {
  if (a.score > b.score) {
    return -1;
  }

  if (a.score < b.score) {
    return 1;
  }

  return 0;
}

/**
 * Compares two objects with a `score` property and returns a value indicating their relative order.
 *
 * This function is used to sort an array of objects with a `score` property in ascending order.
 *
 * @param {Object} a - The first object to compare.
 * @param {number} a.score - The score property of the first object.
 * @param {Object} b - The second object to compare.
 * @param {number} b.score - The score property of the second object.
 * @returns {number} - A negative value if `a.score` is less than `b.score`, a positive value if `a.score` is greater than `b.score`, and zero if they are equal.
 */
function scoreOrderAsc(a, b) {
  if (a.score < b.score) {
    return -1;
  }

  if (a.score > b.score) {
    return 1;
  }

  return 0;
}

/**
 * Renders a component that displays a table of student grades, with options to search and sort the data.
 *
 * @param {Object} props - The component props.
 * @param {string} props.boardId - The ID of the board to fetch grades for.
 * @returns {JSX.Element} - The rendered component.
 */
function DisplayGrades({ boardId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const displayNoneClass = "info-none";
  const showNoInfo = { class: "info-none", icon: "", message: "" };
  const [grades, setGrades] = useState([]);
  const [order, setOrder] = useState("Descending");
  const [infoLabelState, setInfoLabelState] = useState(showNoInfo);

  const errorItem = {
    class: "grade-info-bar error",
    icon: "\u26A0",
    message: "Could not retrieve grades check backend!",
  };

  const [loadingClass, setLoadingClass] = useState("loading-holder");

  useEffect(() => {
    setLoadingClass("loading-holder");
    setInfoLabelState(showNoInfo);
    setGrades([]);

    fetch(`http://localhost:5000/db-grade?boardId=${boardId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadingClass("grade-loader-none");

        const sortedData = data.sort(scoreOrderDesc);
        setGrades(sortedData);
      })
      .catch((error) => {
        console.log(error);
        setInfoLabelState(errorItem);
        setLoadingClass("grade-loader-none");
      });
  }, [boardId]);

  /**
   * Closes the information bar by setting the `infoLabelState` to `showNoInfo`.
   */
  function closeInfoBar() {
    setInfoLabelState(showNoInfo);
  }

  /**
   * Reorders the grades based on the provided type.
   * @param {string} type - The type of ordering, either "Ascending" or "Descending".
   */
  function reorder(type) {
    setOrder(type);

    if (type == "Ascending") {
      const newGrades = [...grades].sort(scoreOrderAsc);

      setGrades(newGrades);
    } else {
      const newGrades = [...grades].sort(scoreOrderDesc);
      setGrades(newGrades);
    }
  }

  return (
    <div>
      <div className={infoLabelState.class}>
        <span className="info-icon">{infoLabelState.icon}</span>
        <span className="message"> {infoLabelState.message} </span>
        <button className="reply-close-button" onClick={closeInfoBar}>
          &times;
        </button>
      </div>

      <div className="grade-control">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search"
        ></input>

        <div className="order">
          <h4>Order by grades: </h4>
          <select onChange={(e) => reorder(e.target.value)} value={order}>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
      </div>

      <div className={loadingClass}>
        <div className="grade-loader"></div>
      </div>

      <DisplayTable data={grades} searchTerm={searchTerm}></DisplayTable>
    </div>
  );
}

/**
  Renders a table row for a student, displaying their name, icon, and score.
  *@param {Object} student - The student object containing the necessary data to render the table row.
  *@param {string} student.studentId - The unique identifier for the student.
  *@param {string} student.icon - The URL or path to the student's icon image.
  *@param {string} student.name - The name of the student.
  *@param {string} student.color - The color associated with the student.
  *@param {number} student.score - The student's score.
*/
function BuildTable({ student }) {
  return (
    <div key={student.studentId} className="item">
      <UserIcon
        size={40}
        img={student.icon}
        name={student.name}
        color={student.color}
      ></UserIcon>
      <h4>{student.name}</h4>
      <h4>Score: {student.score}</h4>
    </div>
  );
}

/**
 * Renders a table displaying a list of students, filtered by a search term.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.data - An array of student objects to display.
 * @param {string} props.searchTerm - The search term to filter the student list.
 * @returns {JSX.Element} - A React component that renders the filtered student table.
 */
function DisplayTable({ data, searchTerm }) {
  var items = [];

  data.forEach((student) => {
    if (student.name.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1) {
      return;
    }

    items.push(<BuildTable student={student}></BuildTable>);
  });

  return <div className="outer">{items}</div>;
}

export default DisplayGrades;
