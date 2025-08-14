import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext.jsx';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import TaskForm from '../components/TaskForm.jsx';

const ListView = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = state.tasks.filter(
    (task) =>
      task.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div className="list-view-container">
      <div className="list-view-controls">
        <div className="search-input-container">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search list"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="control-button">Filter</button>
        <button className="control-button">Group</button>
      </div>

      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Summary</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Due date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="task-key">{task.key}</td>
                <td>{task.summary}</td>
                <td>
                  <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.assignee}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                  <a href="#" className="task-comments">
                    {task.comments}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="8" className="create-task-row">
                <button className="create-task-button" onClick={() => setIsModalOpen(true)}>
                  <PlusIcon />
                  <span>Create</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ListView;