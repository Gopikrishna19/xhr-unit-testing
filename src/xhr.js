import xhr from 'xhr';

const defaultOptions = {
  body: null,
  method: 'GET',
  timeout: 0,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

const prepareResponse = response => {

  return new Response(response.body, {
    ...response,
    status: response.statusCode
  });

};

export const xhrFetch = (url, options) => {

  const xhrOptions = Object.assign(
    {},
    defaultOptions,
    options,
    {url}
  );

  return new Promise((resolve, reject) => {

    xhr(xhrOptions, (error, response) => {

      if (error) { return reject(error); }

      const preparedResponse = prepareResponse(response);

      (preparedResponse.ok ? resolve : reject)(preparedResponse);

    });

  });

};
