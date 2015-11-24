var React = require('react');
var CloseButton = require('./close_button.jsx');

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      showAdvanced: false,
      query: this.props.query || '',
      license: this.props.license || 'freely'
    }
  },
  showAdvanced: function(e) {
    this.setState({showAdvanced: !this.state.showAdvanced})
  },
  handleChange: function(e) {
    var query = e.target.value;
    this.setState({query: query});
  },
  search: function() {
    window.location = '/results/'+this.state.query+'/?license=' + this.state.license;
  },
  handleKeyDown: function(e) {
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      this.search();
    }
  },
  setLicense: function(license) {
    this.setState({'license': license});
    if (this.state.query === '') {
      return;
    }
    this.search();
  },
  render: function() {
    return (
      <div className="search_box">
        <div className="search__advanced" onClick={this.showAdvanced}>advanced search</div>
        <input className="search_bar" placeholder="search" onChange={this.handleChange} onKeyDown={this.handleKeyDown} defaultValue={this.props.query}/>
        <div className="search__button" onClick={this.search}>
          <img src="/images/search.png" />
        </div>
        { this.state.showAdvanced ? <AdvancedSearch setLicense={this.setLicense} license={this.state.license} close={this.showAdvanced} /> : null }
      </div>
    );
  }
});

var AdvancedSearch = React.createClass({
  render: function() {
    return (
      <div className="search__advanced__box">
        <CloseButton onClick={this.props.close} dark={true}/>
        <ul>
          <AdvancedOption setLicense={this.props.setLicense} checked={this.props.license == 'freely'} value="freely">freely reusable</AdvancedOption>
          <AdvancedOption setLicense={this.props.setLicense} checked={this.props.license == 'non-commercial'} value="non-commercial">non commercial use only</AdvancedOption>
        </ul>
      </div>
    )
  }
});

var AdvancedOption = React.createClass({
  handleChange: function() {
    this.props.setLicense(this.props.value);
  },
  render: function() {
    var license = "license"+this.props.value;
    return (
      <li>
        <label className="search__advanced__option">
          <input onChange={this.handleChange} type="radio" name="license" id={license} value={this.props.value} checked={this.props.checked}/>
          {this.props.children}
        </label>
      </li>
    )
  }
})

module.exports = SearchBar;
