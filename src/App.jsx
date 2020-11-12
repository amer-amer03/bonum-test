import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage/ArticleDetailsPage";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ArticlesPage />
        </Route>
        <Route exact path={"/:articleId"}>
          <ArticleDetailsPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
