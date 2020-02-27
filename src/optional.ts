function hashCode(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    let char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

function NoSuchElementException(message: string) {
  this.name = "NoSuchElementException";
  this.message = message;
}

export class Optional {
  private value: any;

  constructor(value?) {
    this.value = value;
  }

  static empty(): Optional {
    return new Optional();
  }

  //Indicates whether some other object is "equal to" this Optional.
  equals(other: Optional): boolean {
    return this.isPresent() && this === other;
  }

  // If a value is present, and the value matches the given predicate, return an Optional describing the value, otherwise return an empty Optional.
  filter(predicate: (argument: any) => boolean): Optional {
    if (!this.isPresent() || !predicate(this.value)) {
      return Optional.empty();
    }
    return Optional.of(this.value);
  }

  // If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise return an empty Optional.
  flatMap(fn: (argument: any) => any): Optional {
    if (this.isPresent) {
      return this.map(fn);
    } else {
      return Optional.empty();
    }
  }

  // If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
  get() {
    if (this.isPresent()) {
      return this.value;
    } else {
      throw new NoSuchElementException("value is not present");
    }
  }

  // Returns the hash code value of the present value, if any, or 0 (zero) if no value is present.
  hashCode() {
    if (this.isPresent()) {
      return "0";
    } else {
      return hashCode(this.value);
    }
  }

  isPresent(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  //If a value is present, invoke the specified consumer with the value, otherwise do nothing.
  ifPresent(consumer) {
    if (this.isPresent()) {
      consumer(this.value);
    }
  }

  // If a value is present, apply the provided mapping function to it, and if the result is non-null, return an Optional describing the result.
  map(fn: (argument: any) => any): Optional {
    if (this.isPresent()) {
      return Optional.of(fn(this.value));
    }
    return Optional.empty();
  }

  // Returns an Optional with the specified present non-null value.
  static of(value: any): Optional {
    return new Optional(value);
  }

  // Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional.
  ofNullable(value: any): Optional {
    if (value === null) {
      return Optional.empty();
    }
    return Optional.of(value);
  }

  // Return the value if present, otherwise return other.
  orElse(other: any): any {
    if (this.isPresent()) {
      return this.value;
    } else {
      return other;
    }
  }

  // Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
  orElseThrow(exception) {
    if (this.isPresent()) {
      return this.value;
    } else {
      throw new exception();
    }
  }

  //Return the value if present, otherwise invoke other and return the result of that invocation.
  orElseGet(fn: () => any): any {
    if (this.isPresent()) {
      return this.value;
    } else {
      return fn();
    }
  }

  // Returns a non-empty string representation of this Optional suitable for debugging.
  toString(): string {
    if (this.isPresent()) {
      return `Optional[${this.value.toString()}]`;
    } else {
      return `Optional.empty`;
    }
  }
}
