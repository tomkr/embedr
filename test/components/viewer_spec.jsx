"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var Viewer = require("../../src/scripts/components/viewer.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("Viewer", function () {

  describe("Default viewer", function() {
    before(function() {
      shallowRenderer.render(<Viewer id="1" type="default"/>);
      this.result = shallowRenderer.getRenderOutput();
      this.toolbar = this.result.props.children[0];
      this.tools = this.toolbar.props.children;
    });

    it("renders a div tag as its root element", function () {
      expect(this.result.type).to.equal("div");
    });

    it("shows the simple embed button", function() {
      expect(this.tools[0].type.displayName).to.equal("SimpleEmbedButton");
    });

    it("doesn't show the region button", function() {
      expect(this.tools[2]).to.equal(null);
    });

    it("shows the zoom buttons", function() {
      expect(this.tools[1]).to.not.equal(null);
    });
  });

  describe("Full viewer", function() {
    before(function() {
      shallowRenderer.render(<Viewer id="1" type="full"/>);
      this.result = shallowRenderer.getRenderOutput();
      this.toolbar = this.result.props.children[0];
      this.tools = this.toolbar.props.children;
    });

    it("renders a div tag as its root element", function () {
      expect(this.result.type).to.equal("div");
    });

    it("shows the popup embed button", function() {
      expect(this.tools[0].type.displayName).to.equal("EmbedButton");
    });

    it("shows zoom buttons", function() {
      expect(this.tools[1]).to.not.equal(null);
    });

    it("shows the region button", function() {
      expect(this.tools[2]).to.not.equal(null);
    });
  });

  describe("No zoom viewer", function() {
    before(function() {
      shallowRenderer.render(<Viewer id="1" type="nozoom"/>);
      this.result = shallowRenderer.getRenderOutput();
      this.toolbar = this.result.props.children[0];
      this.tools = this.toolbar.props.children;
    });

    it("renders a div tag as its root element", function () {
      expect(this.result.type).to.equal("div");
    });

    it("shows the simple embed button", function() {
      expect(this.tools[0].type.displayName).to.equal("SimpleEmbedButton");
    });

    it("doesn't show zoom buttons", function() {
      expect(this.tools[1]).to.equal(null);
    });

    it("doesn't show the region button", function() {
      expect(this.tools[2]).to.equal(null);
    });
  });
});
