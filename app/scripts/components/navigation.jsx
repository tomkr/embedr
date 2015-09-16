var Navigation = React.createClass({
  render: function() {
    return (
      <ul className="header__navigation">
        <li><a href="/content/about">about</a></li>
        <li><a href="/content/how-to-embed">how to embed</a></li>
        <li><a href="/content/contact">contact</a></li>
      </ul>
    )
  }
})

module.exports = Navigation;
