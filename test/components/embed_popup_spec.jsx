"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var EmbedPopup = require("../../src/scripts/components/embed_popup.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("EmbedPopup", function () {
  before(function() {
    shallowRenderer.render(<EmbedPopup id='test'/>);
    this.instance = shallowRenderer._instance._instance;
    this.result = shallowRenderer.getRenderOutput();
  });

  it("renders an div tag as its root element", function () {
    expect(this.result.type).to.equal("div");
  });

  describe("embedLink", function() {
    it("contains the id", function() {
      expect(this.instance.embedLink(true)).to.contain('test');
    });

    it("contains nozoom if not zoomable", function() {
      expect(this.instance.embedLink(false)).to.contain('nozoom=1');
    });

    it("does not contain no zoom if zoomable", function() {
      expect(this.instance.embedLink(true)).to.not.contain('nozoom=1');
    });
  });
});
