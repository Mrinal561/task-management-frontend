const api = (endpoint: string) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (!baseUrl) {
    console.error('REACT_APP_API_BASE_URL is not set');
    return '';
  }
  return `${baseUrl}/${endpoint}`;
};

const endpoints = {
  auth: {
    signin: () => api('auth/signin'),
    signup: () => api('auth/signup'),
},
tasks: {
    list: () => api('tasks'),
    create: () => api('tasks'),
    update: (id: string) => api(`tasks/${id}`),
    delete: (id: string) => api(`tasks/${id}`),
  },
}

export default endpoints;
