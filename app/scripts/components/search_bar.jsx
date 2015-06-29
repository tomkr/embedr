var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      showAdvanced: false,
      query: this.props.query
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
    this.props.search(this.state.query);
  },
  handleKeyDown: function(e) {
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
        this.props.search(this.state.query);
    }
  },
  render: function() {
    return (
      <div className="search_box">
        <div className="search__advanced" onClick={this.showAdvanced}>advanced search</div>
        <input className="search_bar" placeholder="Search" onChange={this.handleChange} onKeyDown={this.handleKeyDown} defaultValue={this.props.query}/>
        <div className="search__button" onClick={this.search}>
          <img src="/images/search.png" />
        </div>
        { this.state.showAdvanced ? <AdvancedSearch setLicense={this.props.setLicense} license={this.props.license} close={this.showAdvanced} /> : null }
      </div>
    );
  }
});

var AdvancedSearch = React.createClass({
  render: function() {
    return (
      <div className="search__advanced__box">
        <div className="close_button" onClick={this.props.close}>X</div>
        <ul>
          <AdvancedOption setLicense={this.props.setLicense} value="none" checked={this.props.license == 'none'}>no filter</AdvancedOption>
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
        <label>
          <input onChange={this.handleChange} type="radio" name="license" id={license} value={this.props.value} checked={this.props.checked}/>
          {this.props.children}
        </label>
      </li>
    )
  }
})

module.exports = SearchBar;
