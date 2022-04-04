export const call = (api, method, request) => {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: "http://eb-pgpp-restapi-dev-tokyo-001.ap-northeast-1.elasticbeanstalk.com"+api,
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
