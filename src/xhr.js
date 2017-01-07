export const xhrFetch = (url) => {

  return new Promise(() => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.send();

  });

};
