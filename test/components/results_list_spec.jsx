"use strict";

var expect = require('chai').expect;
var React = require("React");
var ReactTestUtils = require("react-addons-test-utils");
var ResultList = require("../../src/scripts/components/result_list.jsx");

var shallowRenderer = ReactTestUtils.createRenderer();

describe("ResultList", function () {

  describe("with initial results", function() {
    before(function() {
      var results = [{id: 1, val: "result"}, {id: 2, val: "result"}]
      shallowRenderer.render(<ResultList results={results}/>);
      this.result = shallowRenderer.getRenderOutput();
    });

    it("renders a div", function () {
      expect(this.result.type).to.equal("div");
    });

    it("renders one result", function () {
      var results = this.result.props.children[0].props.children;
      expect(results.length).to.equal(2);
    });
  });

  describe("with no resultss", function() {
    before(function() {
      var results = []
      shallowRenderer.render(<ResultList results={results}/>);
      this.result = shallowRenderer.getRenderOutput();
    });

    it("renders a div", function () {
      expect(this.result.type).to.equal("div");
    });

    it("renders no results", function () {
      var results = this.result.props.children[0].props.children;
      expect(results.type).to.equal('p');
      expect(results.props.className).to.equal('results__empty');
    });
  });
});
