import React from "react";

export const PhotoOfADay = ({ data }) => {
  return (
    <main>
      <time>{data.date} </time>

      <figure>
        <img className="Photo" src={data.url} alt={data.title} />
        <figcaption className="Photo-title">{data.title}</figcaption>
      </figure>

      <dl>
        <div>
          <dt>Image Credit & Copyright</dt>

          <dd>{data.copyright}</dd>
        </div>
        <div>
          <dt> Explanation: </dt>
          <dd> {data.explanation} </dd>
        </div>
      </dl>
    </main>
  );
};
