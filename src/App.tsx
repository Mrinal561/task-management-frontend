import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={token ? <Navigate to="/tasks" /> : <Login />} />
            <Route path="/signup" element={token ? <Navigate to="/tasks" /> : <Signup />} />
            <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/create-task" element={token ? <CreateTask /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;