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
};

export default http;
