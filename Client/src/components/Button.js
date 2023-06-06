import React from "react";

export const ButtonComponent = ({ name, type }) => {
  return (
    <button className="banner-button ml-1" type={type}>
      {name}
    </button>
  );
};
