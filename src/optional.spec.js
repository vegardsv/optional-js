import { Optional } from "./optional";

test("Should be valid types for value", () => {
  const valid = [
    new Optional("string"),
    new Optional(1),
    new Optional([1, 2, 3]),
    new Optional({ foo: "bar" })
  ];
  valid.forEach(optional => {
    expect(optional.isPresent()).toBeTruthy();
  });
});

test("null and undefined as arguments should return an empty Optional instance", () => {
  const valid = [new Optional(null), new Optional(undefined)];
  valid.forEach(optional => {
    expect(optional.isPresent()).toBeFalsy();
  });
});

test("empty() should return an empty Optional instance.", () => {
  expect(Optional.empty().isPresent()).toBeFalsy();
});

test("get() if value is present, return value, else throw Error", () => {
  expect(Optional.of(1).get()).toEqual(1);
  expect(() => Optional.empty().get()).toThrow("value is not present");
});

test("filter() If a value is present, and the value matches the given predicate, return an Optional describing the value, otherwise return an empty Optional.", () => {
  const optional = Optional.of(4);
  expect(optional.filter(val => val < 6).isPresent()).toBeTruthy();
  expect(optional.filter(val => val < 2).isPresent()).toBeFalsy();
});

test("ifpresent(), If a value is present, invoke the specified consumer with the value, otherwise do nothing.", () => {
  function fn() {
    let val = undefined;
    return function set(_val) {
      if (_val) {
        val = _val;
      } else {
        return val;
      }
    };
  }
  const f = fn();
  const dummy = 1;
  Optional.of(dummy).ifPresent(f);
  expect(f()).toEqual(dummy);
});

test("orElseGet() should return the value if present, otherwise invoke other and return the result of that invocation.", () => {
  expect(Optional.empty().orElseGet(() => "abc")).toEqual("abc");
  expect(Optional.of("cde").orElseGet(() => "abc")).toEqual("cde");
});

test("toString() should return a non-empty string representation of this Optional suitable for debugging.", () => {
  expect(Optional.empty().toString()).toEqual(`Optional.empty`);
  expect(Optional.of("123").toString()).toEqual(`Optional[123]`);
});
