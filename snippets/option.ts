import {
  Option,
  some,
  none,
  map,
  chain,
  getOrElse,
  fold,
  fromNullable
} from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

// get the first element
function head<A>(arr: Array<A>): Option<A> {
  return arr.length > 0 ? some(arr[0]) : none;
}

const opt0: Option<number> = head([]); // none
const opt12: Option<number> = head([1, 2]); // some(1)
const opt23: Option<number> = head([2, 3]); // some(2)

// manipulate values
const manipulate1: Option<number> = pipe(
  head([1, 2]),
  map(n => n + 100)
); // some(101)

const manipulate2: Option<number> = pipe(
  head([]),
  map(n => n + 100)
); // none

// using map nests the result
function numberToStringIfGreaterThanOne(n: number): Option<string> {
  return n > 1 ? some(n.toString()) : none;
}

const nested1: Option<Option<string>> = pipe(
  head([2, 3]),
  map(n => numberToStringIfGreaterThanOne(n))
); // some(some("2"))

const nested2: Option<Option<string>> = pipe(
  head([1, 2]),
  map(n => numberToStringIfGreaterThanOne(n))
); // some(none)

// Chain to the rescue
const notNested1: Option<string> = pipe(
  head([2, 3]),
  chain(n => numberToStringIfGreaterThanOne(n))
); // some("2")

const notNested2: Option<string> = pipe(
  head([1, 2]),
  chain(n => numberToStringIfGreaterThanOne(n))
); // none

const notNested3: Option<string> = pipe(
  head([]),
  chain(n => numberToStringIfGreaterThanOne(n))
); // none

// Extract value
const actualNumber1: number = pipe(
  head([42, 43]),
  getOrElse(() => -1)
); // 42

const actualNumber2: number = pipe(
  head([]),
  getOrElse(() => -1)
); // -1

// another way using fold
const usingFold1: number = pipe(
  head([42, 43]),
  fold(() => -1, n => n)
); // 42

const usingFold2: number = pipe(
  head([]),
  fold(() => -1, n => n)
); // -1

// maybe there is a value
function safeFind<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate));
}

[1, 2, 3].find(x => x > 2); // 3
[1, 2, 3].find(x => x > 10); // undefined
safeFind([1, 2, 3], x => x > 2); // some(3)
safeFind([1, 2, 3], x => x > 10); // none

console.log(
  opt0,
  opt12,
  opt23,
  manipulate1,
  manipulate2,
  nested1,
  nested2,
  notNested1,
  notNested2,
  notNested3,
  actualNumber1,
  actualNumber2,
  usingFold1,
  usingFold2
);
