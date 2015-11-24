var $ = require('jquery');
var React = require('react');
var EmbedButton = require('./embed_button.jsx');
var EmbedPopup = require('./embed_popup.jsx');
var IIIFImage = require('react-iiif-image');

var ResultList = React.createClass({
  componentDidMount: function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll: function () {
    if(!this.props.loading && $(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      this.props.nextPage();
    }
  },
  render: function() {
    var resultNodes;
    if (this.props.results.length == 0) {
      resultNodes = <p className="results__empty">No results could be found.</p>
    }
    else {
      resultNodes = this.props.results.map(function (result) {
        return (
          <Result key={result.id} result={result} />
        );
      }.bind(this));
    }

    return (
      <div className="results">
        <div className="results__collection">
          {resultNodes}
          { this.props.loading ? <div className="results__loading">Loading more images.</div> : null }
        </div>
      </div>
    )
  }
});

var Result = React.createClass({
  getInitialState: function () {
    return {
      buttonClass: 'is_hidden',
      showPopup: false
    };
  },
  mouseOver: function () {
    this.setState({buttonClass: 'is_shown'});
  },
  mouseOut: function () {
    this.setState({buttonClass: 'is_hidden'});
  },
  togglePopup: function(e) {
    e.preventDefault();
    this.setState({showPopup: !this.state.showPopup});
  },
  render: function() {
    var link = "/"+this.props.result.fields.id;
    return (
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        { this.state.showPopup ? <EmbedPopup result={this.props.result.fields} close={this.togglePopup} /> : null }
        <div className={this.state.buttonClass}>
          <EmbedButton togglePopup={this.togglePopup}/>
        </div>
        <a href={link}>
          <IIIFImage server="http://iiif.embedr.eu" id={this.props.result.fields.id} size="204,204" />
        </a>
        <p className="result__description">{this.props.result.fields.title[0]}</p>
      </div>
    );
  }
});

module.exports = ResultList;
