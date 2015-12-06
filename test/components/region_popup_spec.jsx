"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var RegionPopup = require("../../src/scripts/components/region_popup.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("RegionPopup", function () {
  before(function() {
    shallowRenderer.render(<RegionPopup region="0,0,2000,2000" id="1"/>);
    this.result = shallowRenderer.getRenderOutput();
  });

  it("renders an div tag as its root element", function () {
    expect(this.result.type).to.equal("div");
  });

  describe("ValidateSize", function() {
    it("sets the maximum size", function() {
      var options = this.result.props.children[4];
      var width = options.props.children.props.children[2];
      var height = options.props.children.props.children[4];
      expect(width.props.value).to.equal(1000);
    });
  });
});
