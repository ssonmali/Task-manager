import React from "react";
import classes from "./AllTasks.module.css";
import { MdDelete } from "react-icons/md";

const AllTasks = ({ tasks, setTasks }) => {
  const handleTaskStatusUpdate = (currentStatus, itemId) => {
    setTasks((prev) => {
      const updated = [...prev];
      const taskIndex = updated.findIndex((item) => item.id === itemId);
      updated[taskIndex].isCompleted = !currentStatus;
      return updated;
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const taskCards = tasks.map((item) => {
    const date = new Date(item.dueDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return (
      <div key={item.id} className={classes.cardContainer}>
        <span className={classes.taskName}>{item.name}</span>
        <div className={classes.itemContainer}>
          {item.projects?.map((proj) => {
            return (
              <span className={classes.projectItem} key={proj.id}>
                {proj?.name}
              </span>
            );
          })}
        </div>
        <span className={classes.description}>{item?.description}</span>
        <div className={classes.itemContainer}>
          {item.members?.map((mem) => {
            return (
              <span className={classes.memberItem} key={mem.id}>
                <img src={mem.imageUrl} alt="member" />
                <span>{mem?.name}</span>
              </span>
            );
          })}
        </div>
        <span className={classes.statusContainer}>
          {item.isCompleted ? (
            <span
              onClick={() => handleTaskStatusUpdate(true, item.id)}
              className={classes.statusComplete}
            >
              Completed
            </span>
          ) : (
            <span
              onClick={() => handleTaskStatusUpdate(false, item.id)}
              className={classes.statusIncomplete}
            >
              Incomplete
            </span>
          )}
          <span className={classes.dueDate}>
            {day}/{month}/{year}
          </span>
          <MdDelete className={classes.deleteCard} onClick={() => handleDeleteTask(item.id)}/>
        </span>
      </div>
    );
  });

  return (
    <div className={classes.mainContainer}>
      <h1>All tasks</h1>
      <div className={classes.cardContainers}>{taskCards}</div>
    </div>
  );
};

export default AllTasks;
