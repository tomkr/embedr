"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var EmbedPopup = require("../../src/scripts/components/embed_popup.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("EmbedPopup", function () {
  before(function() {
    shallowRenderer.render(<EmbedPopup zoomable={true} id='test'/>);
    this.instance = shallowRenderer._instance._instance;
    this.result = shallowRenderer.getRenderOutput();
  });

  it("renders an div tag as its root element", function () {
    expect(this.result.type).to.equal("div");
  });

  describe("embedLink", function() {
    it("contains the id", function() {
      expect(this.instance.embedLink()).to.contain('test');
    });

    it("contains nozoom", function() {
      expect(this.instance.embedLink()).to.contain('nozoom=1');
    });
  });
});
