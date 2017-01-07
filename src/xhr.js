import xhr from 'xhr';

const defaultOptions = {
  body: null,
  method: 'GET',
  timeout: 0
};

export const xhrFetch = (url, options) => {

  const xhrOptions = Object.assign(
    {},
    defaultOptions,
    options,
    {url}
  );

  return new Promise((resolve, reject) => {

    xhr(xhrOptions, () => {
      console.log('meh');
    });

  });

};
