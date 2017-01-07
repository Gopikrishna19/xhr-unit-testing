const defaultOptions = {
  body: null,
  method: 'GET',
  timeout: 0
};

export const xhrFetch = (url, options) => {

  const xhrOptions = Object.assign(
    {},
    defaultOptions,
    options
  );

  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.timeout = xhrOptions.timeout;

    xhr.open(xhrOptions.method, url, true);

    xhr.send(xhrOptions.body);

  });

};
