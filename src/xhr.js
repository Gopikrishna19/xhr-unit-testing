import xhr from 'xhr';

const defaultOptions = {
  body: null,
  method: 'GET',
  timeout: 0
};

const prepareResponse = response => {

  return {
    ok: response.statusCode >= 200 && response.statusCode < 300
  };

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
