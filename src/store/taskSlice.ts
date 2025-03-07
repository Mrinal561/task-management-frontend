import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../api/endpoints';
import axios from '../util/axiosConfig'


interface Task {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.tasks.list());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
  
  export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: { title: string; description: string; status: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(endpoints.tasks.create(), taskData);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

  export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (taskData: { id: string; title: string; description: string; status: string }, { rejectWithValue }) => {
      try {
        console.log('Updating task with data:', taskData);
        const response = await axios.put(endpoints.tasks.update(taskData.id), taskData);
        console.log('Update response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('Error updating task:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );
  
  
  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: string, { rejectWithValue }) => {
      try {
        await axios.delete(endpoints.tasks.delete(taskId));
        return taskId;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log('Update fulfilled, payload:', action.payload);
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          console.log('Task updated in state');
        } else {
          console.log('Task not found in state');
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.error('Update rejected:', action.payload);
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;