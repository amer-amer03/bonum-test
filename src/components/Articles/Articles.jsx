import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./articles.module.scss";

const Articles = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);

      const fetchedData = await fetch(
        `https://5f95a0992de5f50016ca20f5.mockapi.io/api/posts?page=${page}&limit=10`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      setArticlesData((prev) => [...prev, ...fetchedData.items]);
      setHasMore(fetchedData.items.length > 0);
      setLoading(false);
    };

    loadArticles();
  }, [page]);

  return (
    <div className={classes.articles}>
      {articlesData &&
        articlesData.map((article, index) => {
          if (articlesData.length === index + 1) {
            return (
              <div
                ref={lastArticleRef}
                key={article.id}
                className={classes.article}
              >
                <Link to={`/${article.id}`}>
                  <img
                    className={classes.article__image}
                    src={article.image}
                    alt={article.title}
                  />
                </Link>
                <h2 className={classes.article__title}> {article.title} </h2>
                <h3 className={classes.article__subtitle}>
                  {article.subtitle}
                </h3>
              </div>
            );
          } else {
            return (
              <div key={article.id} className={classes.article}>
                <Link to={`/${article.id}`}>
                  <img
                    className={classes.article__image}
                    src={article.image}
                    alt={article.title}
                  />
                </Link>
                <h2 className={classes.article__title}> {article.title} </h2>
                <h3 className={classes.article__subtitle}>
                  {article.subtitle}
                </h3>
              </div>
            );
          }
        })}
      {loading && <p className={classes.spinner}>Loading...</p>}
    </div>
  );
};

export default Articles;
