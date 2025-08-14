import React, { useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskContext } from '../context/TaskContext.jsx';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import TaskForm from '../components/TaskForm.jsx';

const getStatusClass = (status) => {
  switch (status) {
    case 'TO DO':
      return 'status-todo';
    case 'IN PROGRESS':
      return 'status-in-progress';
    case 'IN REVIEW':
      return 'status-in-review';
    case 'DONE':
      return 'status-done';
    default:
      return '';
  }
};

const BoardView = () => {
  const { state, dispatch } = useContext(TaskContext);
  const statuses = ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'DONE'];
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (sourceStatus === destinationStatus) return;

    const draggedTask = state.tasks.find((task) => task.id === result.draggableId);

    if (draggedTask) {
      dispatch({
        type: 'UPDATE_TASK_STATUS',
        payload: {
          id: draggedTask.id,
          status: destinationStatus,
        },
      });
    }
  };

  const filteredTasks = state.tasks.filter(
    (task) =>
      task.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-view-container">
      <div className="board-view-controls">
        <div className="search-input-container">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search board"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="control-button">Filter</button>
        <button className="control-button">Epic</button>
        <button className="control-button">Type</button>
        <button className="control-button">Group</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="kanban-column"
                >
                  <h3 className="kanban-column-title">
                    {status}{' '}
                    <span className="kanban-column-count">
                      ({filteredTasks.filter((task) => task.status === status).length})
                    </span>
                  </h3>
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card"
                          >
                            <p className="task-card-summary">{task.summary}</p>
                            <div className="task-card-meta">
                              <span className="task-card-key">{task.key}</span>
                              <span className={`task-card-status ${getStatusClass(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                            <div className="task-card-assignee">
                              <span>Assignee: {task.assignee}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {status === 'TO DO' && (
                    <button
                      className="create-task-button kanban-create-button"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <PlusIcon />
                      <span>Create</span>
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default BoardView;