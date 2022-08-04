import { useState, useEffect } from "react";
import "./style.scss";

function App() {

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
      .then(response => response.json())
      .then(data => setBlogData(data));
  }, []);

  const shortenDate = (value) => {
    let date = new Date(value);
    const day = date.getDate(date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="App">
      <div id="root" className="row">
        {blogData.map((blog, index) =>
          <div key={index} className="p-card--highlighted  col-small-12 col-medium-3 col-4 card-container">

            <header className="header">
              <p className="p-heading--4 p-text--x-large-capitalised u-no-margin--bottom u-no-padding--bottom" >CLOUD AND SERVER</p>
              <hr className="u-sv1" />
            </header>
            <div className="body u-sv1 sph--small">
              <img className="p-card__image" alt="img" height="185" width="100%" src={blog.featured_media} />
              <h4 className="p-heading--3">
                <a className="p-links" target="_blank" href={blog.link} rel="noreferrer">{blog.title.rendered}</a>
              </h4>

              <p className="p-card__content p-heading--5 u-sv1">By <a target="_blank" href={blog._embedded.author[0].link} rel="noreferrer">{blog._embedded.author[0].name}</a> on {shortenDate(blog.modified)}</p>
            </div>

            <footer className="u-no-padding--bottom">
              <hr className="" />
              <p className="u-no-margin--bottom">Article</p>
            </footer>

          </div>
        )}
      </div>

    </div>
  );
}

export default App;
