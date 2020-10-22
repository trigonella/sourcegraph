import "focus-visible";

import { configureActions } from "@storybook/addon-actions";
import { withConsole } from "@storybook/addon-console";
import { withKnobs } from "@storybook/addon-knobs";
import isChromatic from "chromatic/isChromatic";
import { withDesign } from "storybook-addon-designs";

import {
  AnchorLink,
  setLinkComponent
} from "../client/shared/src/components/Link";

export const decorators = [
  withKnobs,
  withDesign,
  (storyFn, context) => withConsole()(storyFn)(context)
];

setLinkComponent(AnchorLink);

if (isChromatic()) {
  const style = document.createElement("style");
  style.innerHTML = `
      .monaco-editor .cursor {
        visibility: hidden !important;
      }
    `;
  document.head.append(style);
}

configureActions({ depth: 100, limit: 20 });
