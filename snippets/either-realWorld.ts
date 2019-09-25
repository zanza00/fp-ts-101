import * as E from "fp-ts/lib/Either";
import * as A from "fp-ts/lib/Array";
import * as Eq from "fp-ts/lib/Eq";

import { pipe } from "fp-ts/lib/pipeable";

const jsonString =
  '{"menu":{"id":"file","value":"File","popup":{"menuitem":[{"value":"New","onclick":"CreateNewDoc()"},{"value":"Open","onclick":"OpenDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

const rw = pipe(
  E.parseJSON(jsonString, E.toError),
  E.map(o => o.menu)
);
