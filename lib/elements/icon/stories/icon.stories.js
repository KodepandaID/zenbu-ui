import React from "react";

import { default as Icon } from "../icon";
import "../../../style.css";

export default {
  title: 'Example/Icon',
  component: Icon,
}

export const basic = () => (
  <div className="h-14 flex flex-wrap content-center">
    <div><Icon icon="academic-cap" size="md" /></div>
    <div><Icon icon="adjustments" size="md" /></div>
    <div><Icon icon="annotation" size="md" /></div>
  </div>
)

export const iconColor = () => (
  <div className="h-14 flex flex-wrap content-center">
    <div><Icon icon="academic-cap" color="red" size="md" /></div>
  </div>
)