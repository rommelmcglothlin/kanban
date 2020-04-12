// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";

// https://webpack.js.org/guides/dependency-management/#require-context
// @ts-ignore
const requireComponent = require.context(
  // Look for files in the current directory
  ".",
  // Do not look in subdirectories
  false,
  /\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  const component = componentConfig.default || componentConfig;

  if (!component.name) {
    console.log(
      "Unable to load " +
        fileName +
        " Please specify the name of this component"
    );
    return;
  }

  // Globally register the component
  Vue.component(component.name, component);
});
