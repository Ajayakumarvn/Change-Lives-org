import React from "react";

const BannerPoster = (props) => {
  return (
    <div>
      <div className="banner-poster-content">
        <h1>{props.cap}</h1>
      </div>
    </div>
  );
};

export default BannerPoster;


// <div className="banner-poster">
// <div className="banner-poster-content">
//   <h1>{props.cap}</h1>
// </div>
// </div>
