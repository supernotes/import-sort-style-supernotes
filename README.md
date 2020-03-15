# import-sort-style-supernotes

An [import-sort](https://github.com/renke/import-sort) style that is tailored to how Supernotes likes to sort imports for its React apps. The major difference between this sort style and others based around React is that `import-sort-style-supernotes` will sort first-party `component` modules last in order (immediately after non-component modules).

```js
// absolute modules w/ side effects – unsorted because order can be important
import "a";
import "c";
import "b";

// relative modules w/ side effects – unsorted because order can be important
import "./a";
import "./c";
import "./b";

// react and react-ecosystem modules (react, prop-types, redux, etc) – sorted by name
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// node.js modules – sorted by name
import {readFile, writeFile} from "fs";
import * as path from "path";

// third-party modules – sorted by name
import aa from "aa";
import {bba, bbb, bbc} from "bb";
import cc from "cc";

// first-party modules with absolute paths that *are not* components – sorted by name
import aaa from 'aaa/xxx';
import bbb from 'bbb/foo/bar';

// first-party modules with absolute paths *are* components – sorted by name
import aaa from 'components/xxx';
import bbb from 'bbb/foo/bar';

// first-party modules sorted by "relative depth" and then by name
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";

// first-party styles modules sorted by "relative depth" and then by name
import styles from "./Component.css";
```
