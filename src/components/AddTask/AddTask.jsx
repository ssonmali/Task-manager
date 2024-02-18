import React, { useState } from "react";
import classes from "./AddTask.module.css";
import Dropdown from "../Dropdown/Dropdown";

const AddTask = ({ tasks, setTasks }) => {
  const tasksByProject = {};
  tasks.forEach((task) => {
    task.projects.forEach((project) => {
      const projectId = project.id;
      if (!tasksByProject[projectId]) {
        tasksByProject[projectId] = [];
      }
      tasksByProject[projectId].push({
        projectId: project.id,
        projectName: project.name,
      });
    });
  });

  const tasksByMembers = {};
  tasks.forEach((task) => {
    task.members.forEach((member) => {
      const memberId = member.id;
      if (!tasksByMembers[memberId]) {
        tasksByMembers[memberId] = [];
      }
      tasksByMembers[memberId].push({
        memberId: member.id,
        memberName: member.name,
        imageUrl: member.imageUrl,
      });
    });
  });

  const projectList = Object.values(tasksByProject).map((project) => ({
    id: project[0].projectId,
    name: project[0].projectName,
    isChecked: false,
  }));

  const memberList = Object.values(tasksByMembers).map((member) => ({
    id: member[0].memberId,
    name: member[0].memberName,
    imageUrl: member[0].imageUrl,
    isChecked: false,
  }));

  const [projects, setProjects] = useState(projectList);
  const [members, setMembers] = useState(memberList);
  const emptyFormData = {
    title: "",
    description: "",
    dueDate: new Date(),
  };
  const [formData, setFormData] = useState(emptyFormData);

  const handleChange = (val, formKey) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: val,
    }));
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const selectedProjects = projects.filter((item) => item.isChecked === true);
    const selectedMembers = members.filter((item) => item.isChecked === true);
    if (selectedMembers.length === 0 || selectedProjects.length === 0) {
      alert("Please add at least one member and at least one project");
      return;
    }
    const projectList = selectedProjects.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    const memberList = selectedMembers.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
    }));
    const data = {
      id: Math.random() * 100000,
      name: formData.title,
      dueDate: formData.dueDate,
      isCompleted: false,
      description: formData.description,
      members: memberList,
      projects: projectList,
    };
    setTasks((prev) => {
      const newData = [...prev];
      newData.push(data);
      return newData;
    });
    setFormData(emptyFormData);
    setMembers(memberList);
    setProjects(projectList);
    alert("Added task succesfully");
  };

  return (
    <div className={classes.mainContainer}>
      <form
        className={classes.formContainer}
        onSubmit={(e) => handleAddNewTask(e)}
      >
        <div className={classes.formItem}>
          <label htmlFor="title">Task Title</label>
          <input
            onChange={(e) => handleChange(e.target.value, "title")}
            value={formData.title}
            placeholder="Enter task title"
            id="title"
            maxLength={30}
          />
        </div>
        <div className={classes.formItem}>
          <label htmlFor="description">Task Description</label>
          <input
            value={formData.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            placeholder="Enter task description"
            id="description"
            maxLength={100}
          />
        </div>
        <Dropdown
          label="Select Projects"
          dropdownList={projects}
          setDropdownList={setProjects}
        />
        <Dropdown
          label="Select Members"
          dropdownList={members}
          setDropdownList={setMembers}
        />
        <div className={classes.formItem}>
          <label htmlFor="date">Task due date</label>
          <input
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                dueDate: e.target.value,
              }));
            }}
            onKeyDown={(e) => e.preventDefault()}
            id="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className={classes.buttonContainer}>
          <button type="submit" onClick={(e) => handleAddNewTask(e)}>
            Add new task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
