import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../store/taskSlice';
import { AppDispatch } from '../store';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
});

const CreateTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      <Formik
        initialValues={{ title: '', description: '', status: 'OPEN' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          try {
            await dispatch(createTask(values)).unwrap();
            resetForm();
            setStatus('Task created successfully');
          } catch (error: any) {
            setStatus(error.message || 'Failed to create task');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            {status && <div className={`text-sm ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{status}</div>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTask;