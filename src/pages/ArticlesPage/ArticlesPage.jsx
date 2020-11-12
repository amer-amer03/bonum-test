import Articles from "../../components/Articles/Articles";
import classes from "./articlesPage.module.scss";

const ArticlesPage = () => {
  return (
    <div className={classes.articlesPage}>
      <Articles />
    </div>
  );
};

export default ArticlesPage;
