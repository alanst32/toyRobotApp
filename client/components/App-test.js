var React = require('react');
var expect = require('expect');
import App from './App';
import TestUtils from 'react-dom/test-utils';

describe('App', function () {
  it('loads without problems', function () {
    var app = TestUtils.renderIntoDocument( <App/> );
    expect(TestUtils.isCompositeComponent(app)).toBeTruthy();
  });
});
