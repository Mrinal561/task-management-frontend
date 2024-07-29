import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/create-task" element={<CreateTask />} />
            </Route>
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;