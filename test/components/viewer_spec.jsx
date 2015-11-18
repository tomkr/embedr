"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var Viewer = require("../../src/scripts/components/viewer.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("Viewer", function () {
  before(function() {
    shallowRenderer.render(<Viewer id="1" type="nozoom"/>);
    this.result = shallowRenderer.getRenderOutput();
  });

  it("renders an div tag as its root element", function () {
    expect(this.result.type).to.equal("div");
  });

  describe("nozoom", function() {
    it("doesn't show zoom buttons", function() {
      var toolbar = this.result.props.children[0];
      expect(toolbar.props.children[1]).to.equal(null);
    });
  });
});
