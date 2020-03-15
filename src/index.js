const fixedOrder = ['react', 'prop-types'];

export default function(
  {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isInstalledModule,
    isNodeModule,
    isRelativeModule,
    isScopedModule,
    moduleName,
    naturally,
    not,
    startsWith,
    unicode,
  },
  file
) {
  const isReactModule = imported => Boolean(imported.moduleName.match(/^(react|prop-types|redux)/));
  const isComponentModule = imported => Boolean(imported.moduleName.match(/^components/));
  const isStylesModule = imported => Boolean(imported.moduleName.match(/\.(s?css|less)$/));

  const reactComparator = (name1, name2) => {
    let i1 = fixedOrder.indexOf(name1);
    let i2 = fixedOrder.indexOf(name2);

    i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
    i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;

    return i1 === i2 ? naturally(name1, name2) : i1 - i2;
  };

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule, not(isStylesModule)) },
    { separator: true },

    // node modules (react)
    // import React from "react";
    {
      match: isReactModule,
      sort: moduleName(reactComparator),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // scoped (@) modules
    {
      match: isScopedModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },

    // other stuff in node_modules
    // import … from "fs";
    {
      match: isInstalledModule(file),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // absolute modules (but not node modules)
    // import … from 'vars/defines';
    {
      match: and(isAbsoluteModule, not(isComponentModule)),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import Component from "components/Component.js";
    {
      match: isComponentModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: and(isRelativeModule, not(isStylesModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },

    // import "./styles.css";
    { match: and(hasNoMember, isRelativeModule, isStylesModule) },

    // import styles from "./Component.css";
    {
      match: isStylesModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
    { separator: true },
  ];
}
