const API_SERVER_URL=process.env.REACT_APP_API_SERVER_URL
export const call = (api, method, request) => {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_SERVER_URL+api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      return Promise.reject(error);
    });
};
