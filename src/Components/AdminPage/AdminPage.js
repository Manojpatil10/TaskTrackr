import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./AdminPage.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://67122e854eca2acdb5f77a1f.mockapi.io/UserData")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleAssignTask = () => {
    if (task.trim() === "" || deadline.trim() === "") {
      alert("Task description and deadline are required!");
      return;
    }

    const newTask = {
      taskName: task,
      deadline: deadline,
      urgency: urgency,
      status: "Pending", // Default status
      id: "", // Initial id is an empty string
    };

    axios
      .get(
        `https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${selectedUser.id}`
      )
      .then((response) => {
        const existingTasks = response.data.TaskDetails || [];

        // Find the next available task ID by incrementing the last task ID
        const newTaskId =
          existingTasks.length > 0
            ? Math.max(...existingTasks.map((task) => task.id)) + 1
            : 1; // Start with ID 1 if no tasks exist

        // Update the new task with the correct ID
        newTask.id = newTaskId;

        // Add the new task with the updated ID to the user's task list
        const updatedTaskDetails = [...existingTasks, newTask];

        return axios.put(
          `https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${selectedUser.id}`,
          { TaskDetails: updatedTaskDetails }
        );
      })
      .then(() => {
        alert("Task assigned successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, TaskDetails: [...user.TaskDetails, newTask] }
              : user
          )
        );
        setTask("");
        setDeadline("");
        setUrgency("Medium");
      })
      .catch((error) => console.error("Error assigning task:", error));
  };

  const handleClearTask = () => {
    // axios
    //   .put(
    //     `https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${selectedUser.id}`,
    //     { TaskDetails: [] }
    //   )
    //   .then(() => {
    //     alert("All tasks cleared successfully!");
    //     setUsers((prevUsers) =>
    //       prevUsers.map((user) =>
    //         user.id === selectedUser.id ? { ...user, TaskDetails: [] } : user
    //       )
    //     );
    //     setTask("");
    //     setDeadline("");
    //     setUrgency("Medium");
    //   })
    //   .catch((error) => console.error("Error clearing tasks:", error));

    setTask("");
    setDeadline("");
    setUrgency("Medium");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusData = () => {
    const completed =
      selectedUser?.TaskDetails.filter((task) => task.status === "Completed")
        .length || 0;

    const pending =
      selectedUser?.TaskDetails.filter((task) => task.status === "Pending")
        .length || 0;

    const accepted =
      selectedUser?.TaskDetails.filter((task) => task.status === "Accepted")
        .length || 0;

    return {
      labels: ["Completed", "Accepted", "Pending"],
      datasets: [
        {
          label: "Task Status",
          data: [completed, accepted, pending],
          backgroundColor: ["#2ecc71", "#3498db", "#e74c3c"],
          hoverBackgroundColor: ["#27ae60", "#2980b9", "#c0392b"],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className={styles.adminContainer}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-5 col-xl-3 mb-xl-0">
            <div className={styles.leftSection}>
              <div>
                <div className={styles.adminInfo}>
                  <h2>Admin Dashboard</h2>
                  <p>Welcome, Manoj Patil {"\u270B"}</p>
                </div>
                <div>
                  <h3>Registered Users</h3>
                  <ul className={styles.userList}>
                    {users
                      .filter((user) => user.LoginId === "user")
                      .map((user) => (
                        <li
                          key={user.id}
                          className={`${styles.userItem} ${
                            selectedUser?.id === user.id
                              ? `${styles.selected}`
                              : ""
                          }`}
                          onClick={() => setSelectedUser(user)}
                        >
                          {user.FirstName} {user.LastName}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className={styles.logOutDiv}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-9">
            <div className={styles.rightSection}>
              {selectedUser ? (
                <div className={styles.userDetails}>
                  <h3 className="text-center mb-4">Task Assignment</h3>
                  <div className="row mb-4">
                    <div className="col-12 mb-2 col-md-6">
                      <p className="mb-0">
                        <strong>User Name:</strong> {selectedUser.FirstName}{" "}
                        {selectedUser.LastName}
                      </p>
                    </div>
                    <div className="col-12 mb-2 col-md-6">
                      <p className="mb-0">
                        <strong>Email:</strong> {selectedUser.Email}
                      </p>
                    </div>
                    <div className="col-12 mb-2 col-md-6">
                      <p className="mb-0">
                        <strong>Login Id:</strong> {selectedUser.LoginId}
                      </p>
                    </div>
                    <div className="col-12 mb-2 col-md-6">
                      <p className="mb-0">
                        <strong>Contact:</strong> {selectedUser.MobNumber}
                      </p>
                    </div>

                  </div>
                  <div className={styles.tableAndChart}>
                    <div className="row">
                      <div className="col-12 mb-4 col-lg-6 mb-lg-0">
                        <div className={`${styles.tableOuter} overflow-auto`}>
                          <table className={styles.taskTable}>
                            <thead>
                              <tr>
                                <th>Sr.No.</th>
                                <th>Task Name</th>
                                <th>Deadline</th>
                                <th>Urgency</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedUser.TaskDetails.map((task, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{task.taskName}</td>
                                  <td>{task.deadline}</td>
                                  <td>{task.urgency}</td>
                                  <td>{task.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className={styles.pieDiv}>
                          <h3>Task Status Distribution</h3>
                          <div className={styles.pieChartContainer}>
                            <Pie
                              data={getStatusData()}
                              options={chartOptions}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.taskDiv}>
                    <label>
                      <strong>Task:</strong>
                    </label>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      placeholder="Enter task description"
                      className={styles.taskInput}
                    />
                    <label>
                      <strong>Deadline:</strong>
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className={styles.taskInput}
                    />
                    <label>
                      <strong>Urgency:</strong>
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className={styles.taskInput}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <div className={styles.buttonGroup}>
                      <div className="row gap-2 gap-md-0">
                        <div className="col-12 col-md-6">
                          <button
                            onClick={handleAssignTask}
                            className={styles.assignButton}
                          >
                            Assign Task
                          </button>
                        </div>
                        <div className="col-12 col-md-6">
                          <button
                            onClick={handleClearTask}
                            className={styles.clearButton}
                          >
                            Clear Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className={styles.placeholder}>
                  Select a user to assign a task.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
