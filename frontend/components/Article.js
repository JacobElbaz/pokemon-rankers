import Image from "next/image";
import React from "react";

function Article({ title, description, image, url }) {
  return (
    <div className="article">
      <div>
        <Image src={image} alt={`image-${title}`} style={{objectFit: 'contain'}} width={300} height={150}  />
      </div>
      <div>
        <a href={url} target="_blank">{title}</a>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Article;
