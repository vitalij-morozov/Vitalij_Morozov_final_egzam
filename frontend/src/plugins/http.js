const http = {
  post: async (url, data) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      const dataInJs = await response.json();
      return dataInJs;
    } catch (error) {
      console.log(error.message);
    }
  },
  patch: async (url, data) => {
    try {
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      const dataInJs = await response.json();
      return dataInJs;
    } catch (error) {
      console.log(error.message);
    }
  },
  get: async (url) => {
    try {
      const response = await fetch(url);
      const dataInJs = await response.json();
      return dataInJs;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default http;
