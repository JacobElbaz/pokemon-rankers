import Image from "next/image";
import React from "react";

function Article({ title, description, image, url }) {
  return (
    <div className="article">
      <div className="image-container">
        <Image src={image} alt={`image-${title}`} fill/>
      </div>
      <div style={{padding: '1rem'}}>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={url} target="_blank">Read more...</a>
      </div>
    </div>
  );
}

export default Article;
