import React from "react";
import { text } from "@storybook/addon-knobs";
import { DancingScriptQuote } from "./DancingScriptQuote";

export default {
  component: DancingScriptQuote,
  title: 'Dancing Script Quote',
};

export const quote = () => <DancingScriptQuote quote={text('Quote', 'Klanten win je met <u>vertrouwen</u>')} />;
