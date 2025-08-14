import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../context/TaskContext.jsx';
import { Cross1Icon } from '@radix-ui/react-icons';

const TaskForm = ({ onClose }) => {
  const { dispatch } = useContext(TaskContext);
  const [taskData, setTaskData] = useState({
    summary: '',
    assignee: '',
    dueDate: '',
    priority: 'Low',
    status: 'TO DO',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      key: `OPS-${Math.floor(Math.random() * 1000) + 1}`,
      ...taskData,
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    onClose();
  };

  return (
    <div className="task-form-modal-overlay">
      <div className="task-form-modal">
        <div className="task-form-header">
          <h3>Create New Task</h3>
          <button className="close-button" onClick={onClose}>
            <Cross1Icon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <label className="form-field">
            Summary
            <input
              type="text"
              name="summary"
              value={taskData.summary}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-field">
            Assignee
            <input
              type="text"
              name="assignee"
              value={taskData.assignee}
              onChange={handleChange}
            />
          </label>
          <label className="form-field">
            Due Date
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </label>
          <label className="form-field">
            Priority
            <select name="priority" value={taskData.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label className="form-field">
            Comments
            <textarea
              name="comments"
              value={taskData.comments}
              onChange={handleChange}
            ></textarea>
          </label>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;