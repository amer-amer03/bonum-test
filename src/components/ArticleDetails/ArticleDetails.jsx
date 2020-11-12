import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./articleDetails.module.scss";

const ArticleDetails = () => {
  const { articleId } = useParams();

  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(articlesData);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);

      const fetchedData = await fetch(
        `https://5f95a0992de5f50016ca20f5.mockapi.io/api/posts/${articleId}`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      setArticlesData(fetchedData);
      console.log(fetchedData);

      setLoading(false);
    };

    loadArticles();
  }, []);

  return (
    <>
      <div className={classes.article}>
        <h1 className={classes.article__title}>{articlesData.title}</h1>
        <h2 className={classes.article__subtitle}>{articlesData.subtitle}</h2>
        <img
          className={classes.article__image}
          src={articlesData.image}
          alt={articlesData.image}
        />
        <p className={classes.article__description}>
          {articlesData.description}
        </p>
      </div>
      {loading && <p className={classes.spinner}>Loading...</p>}
    </>
  );
};

export default ArticleDetails;
