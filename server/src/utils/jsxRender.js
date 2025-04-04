// utils/jsxRender.js
const react = require('react');
const reactDomServer = require('react-dom/server');

module.exports = (filePath, options, callback) => {
  try {
    const component = require(filePath);
    const markup = reactDomServer.renderToString(
      react.createElement(component, options)
    );
    return callback(null, markup);
  } catch (error) {
    return callback(error);
  }
};