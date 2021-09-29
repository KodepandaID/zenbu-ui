import React from "react";

import Input from "../input";

export default {
  title: 'Example/Input Card Number',
  component: Input.CardNumber
}

export const basic = () => (
  <Input.CardNumber placeholder="Credit Card Number..." />
)

export const full = () => (
  <Input.CardNumber full placeholder="Credit Card Number..." />
)