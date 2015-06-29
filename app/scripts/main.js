var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var App = require('./components/app.jsx');
var Search = require('./components/search.jsx');
var Detail = require('./components/detail.jsx');

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Search}/>
    <Route name="detail" path="/:id" handler={Detail}/>
  </Route>
);

ReactRouter.run(routes, function(Root) {
  React.render(<Root/>, document.getElementById('search'))
});
