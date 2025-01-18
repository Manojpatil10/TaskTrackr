// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./UserPage.module.css";

// const UserPage = () => {
//   const [user, setUser] = useState(null);
//   const { id } = useParams(); // Get user id from route params
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data by user ID
//     axios
//       .get(`https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${id}`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => console.error("Error fetching user data:", error));

//   }, [id]);

//   const handleLogout = () => {
//     navigate("/"); // Redirect to login page
//   };

//   const handleStatusChange = (status, taskId) => {
//     // Update task status by matching the task ID
//     const updatedTasks = user.TaskDetails.map((task) =>
//       task.id === taskId ? { ...task, status } : task
//     );
//     setUser((prev) => ({ ...prev, TaskDetails: updatedTasks }));
//   };

//   const updateTaskStatus = () => {
//     // Send updated task list to the API
//     axios
//       .put(
//         `https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${id}`,
//         { TaskDetails: user.TaskDetails }
//       )
//       .then(() => {
//         alert("Task status updated successfully!");
//       })
//       .catch((error) => console.error("Error updating task status:", error));
//   };

//   const categorizedTasks = user?.TaskDetails.reduce(
//     (acc, task) => {
//       if (task.status.toLowerCase() === "completed") {
//         acc.completed.push(task);
//       } else {
//         acc.pending.push(task);
//       }
//       return acc;
//     },
//     { completed: [], pending: [] }
//   );

//   return (
//     <div className={styles.userContainer}>
//       <header className={styles.userHeader}>
//         {user ? (<h1>Hello, {user.FirstName} !</h1>):("")}
//         <button className={styles.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       {user ? (
//         <div className={styles.userContent}>
//           <div className={styles.leftSection}>
//             <h2>User Details</h2>
//             <div className={styles.userDetails}>
//               <p>
//                 <strong>First Name:</strong> {user.FirstName}
//               </p>
//               <p>
//                 <strong>Last Name:</strong> {user.LastName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.Email || "Not provided"}
//               </p>
//               <p>
//                 <strong>Contact Number:</strong> {user.MobNumber || "Not provided"}
//               </p>
//               <p>
//                 <strong>Login Id:</strong> {user.LoginId || "Not provided"}
//               </p>
//             </div>
//           </div>

//           <div className={styles.rightSection}>
//             <h2>Tasks</h2>

//             <div className={`${styles.taskSection} ${styles.pendingTasks}`}>
//               <h3>Pending Tasks</h3>
//               {categorizedTasks?.pending.length > 0 ? (
//                 <div className={styles.taskGrid}>
//                   {categorizedTasks.pending.map((task) => (
//                     <div key={task.id} className={styles.taskBox}>
//                       <h4>{task.taskName}</h4>
//                       <p>
//                         <strong>Deadline:</strong> {task.deadline}
//                       </p>
//                       <p>
//                         <strong>Urgency:</strong>{" "}
//                         <span
//                           className={`${styles.urgencyBadge} ${
//                             styles[task.urgency.toLowerCase()]
//                           }`}
//                         >
//                           {task.urgency}
//                         </span>
//                       </p>
//                       <p>
//                         <strong>Status:</strong>{" "}
//                         <select
//                           value={task.status}
//                           onChange={(e) =>
//                             handleStatusChange(e.target.value, task.id)
//                           }
//                           className={styles.statusSelect}
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Completed">Completed</option>
//                         </select>
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No pending tasks.</p>
//               )}
//             </div>

//             <div className={`${styles.taskSection} ${styles.completedTasks}`}>
//               <h3>Completed Tasks</h3>
//               {categorizedTasks?.completed.length > 0 ? (
//                 <div className={styles.taskGrid}>
//                   {categorizedTasks.completed.map((task) => (
//                     <div key={task.id} className={styles.taskBox}>
//                       <h4>{task.taskName}</h4>
//                       <p>
//                         <strong>Deadline:</strong> {task.deadline}
//                       </p>
//                       <p>
//                         <strong>Urgency:</strong>{" "}
//                         <span
//                           className={`${styles.urgencyBadge} ${
//                             styles[task.urgency.toLowerCase()]
//                           }`}
//                         >
//                           {task.urgency}
//                         </span>
//                       </p>
//                       <p>
//                         <strong>Status:</strong> {task.status}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No completed tasks.</p>
//               )}
//             </div>

//             <button
//               className={styles.updateButton}
//               onClick={updateTaskStatus}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className={styles.loading}>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleStatusChange = (status, taskId) => {
    const updatedTasks = user.TaskDetails.map((task) => {
      if (task.id === taskId) {
        if (status === "Completed" && task.status !== "Accepted") {
          alert("You must accept the task before completing it.");
          return task;
        }
        return { ...task, status };
      }
      return task;
    });

    setUser((prev) => ({ ...prev, TaskDetails: updatedTasks }));
  };

  const updateTaskStatus = () => {
    axios
      .put(`https://67122e854eca2acdb5f77a1f.mockapi.io/UserData/${id}`, {
        TaskDetails: user.TaskDetails,
      })
      .then(() => {
        alert("Task statuses updated successfully!");
      })
      .catch((error) => console.error("Error updating task statuses:", error));
  };

  const categorizedTasks = user?.TaskDetails.reduce(
    (acc, task) => {
      if (task.status.toLowerCase() === "completed") {
        acc.completed.push(task);
      } else if (task.status.toLowerCase() === "accepted") {
        acc.accepted.push(task);
      } else {
        acc.pending.push(task);
      }
      return acc;
    },
    { completed: [], accepted: [], pending: [] }
  );

  return (
    <div className={styles.userContainer}>
      <div className="container-fluid">
        <div className={styles.userHeader}>
          {user ? (
            <h1>
              Hello, {user.FirstName} {}!
            </h1>
          ) : null}
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {user ? (
          <div className={styles.userContent}>
            <div className="row">
              <div className="col-12 mb-4 col-xl-3 mb-xl-0">
                <div className={styles.leftSection}>
                  <h2 className={styles.titleH2}>User Details</h2>
                  <div className={styles.userDetails}>
                    <div className="row">
                      <div className="col-12 col-sm-6 col-lg-4 col-xl-12">
                        <p>
                          <strong>First Name :</strong> {user.FirstName}
                        </p>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 col-xl-12">
                        <p>
                          <strong>Last Name :</strong> {user.LastName}
                        </p>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 col-xl-12">
                        <p>
                          <strong>Email :</strong>{" "}
                          {user.Email || "Not provided"}
                        </p>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 col-xl-12">
                        <p>
                          <strong>Contact :</strong>{" "}
                          {user.MobNumber || "Not provided"}
                        </p>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 col-xl-12">
                        <p>
                          <strong>Login ID :</strong>{" "}
                          {user.LoginId || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-9">
                <div className={styles.rightSection}>
                  <h2 className={styles.titleH2}>Tasks Details</h2>

                  <div
                    className={`${styles.taskSection} ${styles.pendingTasks}`}
                  >
                    <h3 className={styles.red}>Pending Tasks</h3>
                    {categorizedTasks?.pending.length > 0 ? (
                      <div className={styles.taskGrid}>
                        {categorizedTasks.pending.map((task) => (
                          <div key={task.id} className={styles.taskBox}>
                            <h4>{task.taskName}</h4>
                            <p>
                              <strong>Deadline:</strong> {task.deadline}
                            </p>
                            <p>
                              <strong>Urgency:</strong>{" "}
                              <span
                                className={`${styles.urgencyBadge} ${
                                  styles[task.urgency.toLowerCase()]
                                }`}
                              >
                                {task.urgency}
                              </span>
                            </p>
                            <p>
                              <strong>Status:</strong> {task.status}
                            </p>
                            <button
                              className={styles.acceptButton}
                              onClick={() =>
                                handleStatusChange("Accepted", task.id)
                              }
                            >
                              Accept Task
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No pending tasks.</p>
                    )}
                  </div>

                  <div
                    className={`${styles.taskSection} ${styles.acceptedTasks}`}
                  >
                    <h3 className={styles.yellow}>Accepted Tasks</h3>
                    {categorizedTasks?.accepted.length > 0 ? (
                      <div className={styles.taskGrid}>
                        {categorizedTasks.accepted.map((task) => (
                          <div key={task.id} className={styles.taskBox}>
                            <h4>{task.taskName}</h4>
                            <p>
                              <strong>Deadline:</strong> {task.deadline}
                            </p>
                            <p>
                              <strong>Urgency:</strong>{" "}
                              <span
                                className={`${styles.urgencyBadge} ${
                                  styles[task.urgency.toLowerCase()]
                                }`}
                              >
                                {task.urgency}
                              </span>
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <select
                                value={task.status}
                                onChange={(e) =>
                                  handleStatusChange(e.target.value, task.id)
                                }
                                className={styles.statusSelect}
                              >
                                <option value="Accepted">Accepted</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No accepted tasks.</p>
                    )}
                  </div>

                  <div
                    className={`${styles.taskSection} ${styles.completedTasks}`}
                  >
                    <h3 className={styles.green}>Completed Tasks</h3>
                    {categorizedTasks?.completed.length > 0 ? (
                      <div className={styles.taskGrid}>
                        {categorizedTasks.completed.map((task) => (
                          <div key={task.id} className={styles.taskBox}>
                            <h4>{task.taskName}</h4>
                            <p>
                              <strong>Deadline:</strong> {task.deadline}
                            </p>
                            <p>
                              <strong>Urgency:</strong>{" "}
                              <span
                                className={`${styles.urgencyBadge} ${
                                  styles[task.urgency.toLowerCase()]
                                }`}
                              >
                                {task.urgency}
                              </span>
                            </p>
                            <p>
                              <strong>Status:</strong> {task.status}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No completed tasks.</p>
                    )}
                  </div>

                  <button
                    className={styles.updateButton}
                    onClick={updateTaskStatus}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
