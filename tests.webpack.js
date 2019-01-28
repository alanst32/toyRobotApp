const enzyme = require('enzyme');
const adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
enzyme.configure({ adapter: new adapter() });

// tests.webpack.js
const context = require.context('./client', true, /-test\.jsx?$/);
context.keys().forEach(context);
