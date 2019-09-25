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

const example1: Option<number> = pipe(
  head([1, 2]),
  map(n => n + 100),
); // some(101)

// using map nests the result
function numberToStringIfGreaterThanOne(n: number): Option<string> {
  return n > 1 ? some(n.toString()) : none;
}

const nested1: Option<Option<string>> = pipe(
  head([2, 3]),
  map(n => numberToStringIfGreaterThanOne(n)),
); // some(some("2"))

const nested2: Option<Option<string>> = pipe(
  head([1, 2]),
  map(n => numberToStringIfGreaterThanOne(n)),
); // some(none)

// Chain to the rescue 
const notNested1: Option<string> = pipe(
  head([2, 3]),
  chain(n => numberToStringIfGreaterThanOne(n)),
); // some("2")

const notNested2: Option<string> = pipe(
  head([1, 2]),
  chain(n => numberToStringIfGreaterThanOne(n)),
); // none

const notNested3: Option<string> = pipe(
  head([]),
  chain(n => numberToStringIfGreaterThanOne(n)),
); // none

// Extract value
const actualNumber1: number = pipe(
  head([42, 43]),
  getOrElse(() => -1),
); // 42

const actualNumber2: number = pipe(
  head([]),
  getOrElse(() => -1),
); // -1

// another way using fold
const usingFold1: number = pipe(
  head([42, 43]),
  fold(() => -1, n => n),
); // 42

const usingFold2: number = pipe(
  head([]),
  fold(() => -1, n => n),
); // -1


