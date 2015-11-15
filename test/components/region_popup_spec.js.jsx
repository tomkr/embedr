"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var RegionPopup = require("../../app/scripts/components/region_popup.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("RegionPopup", function () {
  it("renders an div tag as its root element", function () {
    shallowRenderer.render(<RegionPopup region="100,100" id="1"/>);
    var result = shallowRenderer.getRenderOutput();
    expect(result.type).to.equal("div");
  });
});
