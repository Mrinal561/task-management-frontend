import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../store/taskSlice';
import { RootState, AppDispatch } from '../store';
import UpdateTask from './UpdateTask';


const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);
  const [updateTaskId, setUpdateTaskId] = useState<string | null>(null);


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleUpdateClose = () => {
    setUpdateTaskId(null);
    console.log('Fetching tasks after update');
    dispatch(fetchTasks());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Link
          to="/create-task"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Task
        </Link>
      </div>
      <ul className="space-y-4">
      {tasks.map((task) => (
          <li key={task.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            <p className="mt-1 text-sm text-gray-500">Status: {task.status}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setUpdateTaskId(task.id)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {updateTaskId && (
        <UpdateTask
          task={tasks.find(t => t.id === updateTaskId)!}
          onClose={handleUpdateClose}
        />
      )}
    </div>
  );
};

export default TaskList;