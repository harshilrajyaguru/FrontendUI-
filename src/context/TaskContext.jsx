import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [
    { id: uuidv4(), key: 'OPS-1', summary: 'Sample Payment Processing', status: 'IN PROGRESS', assignee: 'User A', dueDate: '2025-07-17', comments: 'Needs review', priority: 'High' },
    { id: uuidv4(), key: 'OPS-2', summary: 'Sample User Authentication', status: 'TO DO', assignee: 'User B', dueDate: '2025-07-10', comments: 'Add comment', priority: 'Medium' },
    { id: uuidv4(), key: 'OPS-3', summary: 'Sample User Login', status: 'TO DO', assignee: 'User C', dueDate: '2025-07-25', comments: 'Initial setup', priority: 'Low' },
    { id: uuidv4(), key: 'OPS-4', summary: 'Sample Password Recovery', status: 'DONE', assignee: 'User D', dueDate: '2025-07-05', comments: 'Completed', priority: 'High' },
    { id: uuidv4(), key: 'OPS-5', summary: 'Sample Credit Card Payment', status: 'IN REVIEW', assignee: 'User E', dueDate: '2025-07-20', comments: 'Testing in progress', priority: 'Medium' },
    { id: uuidv4(), key: 'OPS-6', summary: 'User Session Management', status: 'TO DO', assignee: 'User A', dueDate: '2025-08-01', comments: 'Initial planning', priority: 'High' },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        ),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
}

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};