import React from "react";

const MarkdownComponent = React.lazy(
  () => import(/* webpackChunkName: "external_A" */ "./MarkdownRender")
);

export const MultiPageMarkdown = React.lazy(
  () => import(/* webpackChunkName: "external_A" */ "./MultiPageMarkdown")
);

export default MarkdownComponent;
