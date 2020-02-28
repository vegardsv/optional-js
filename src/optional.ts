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

  equals(other: Optional): boolean {
    return this.isPresent() && this === other;
  }

  filter(predicate: (argument: any) => boolean): Optional {
    if (!this.isPresent() || !predicate(this.value)) {
      return Optional.empty();
    }
    return Optional.of(this.value);
  }

  flatMap(fn: (argument: any) => any): Optional {
    if (this.isPresent()) {
      return fn(this.value);
    } else {
      return Optional.empty();
    }
  }

  get() {
    if (this.isPresent()) {
      return this.value;
    } else {
      throw new NoSuchElementException("value is not present");
    }
  }

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

  ifPresent(consumer) {
    if (this.isPresent()) {
      consumer(this.value);
    }
  }

  map(fn: (argument: any) => any): Optional {
    if (this.isPresent()) {
      return Optional.of(fn(this.value));
    }
    return Optional.empty();
  }

  static of(value: any): Optional {
    return new Optional(value);
  }

  ofNullable(value: any): Optional {
    if (value === null) {
      return Optional.empty();
    }
    return Optional.of(value);
  }

  orElse(other: any): any {
    if (this.isPresent()) {
      return this.value;
    } else {
      return other;
    }
  }

  orElseThrow(exception) {
    if (this.isPresent()) {
      return this.value;
    } else {
      throw new exception();
    }
  }

  orElseGet(fn: () => any): any {
    if (this.isPresent()) {
      return this.value;
    } else {
      return fn();
    }
  }

  toString(): string {
    if (this.isPresent()) {
      return `Optional[${this.value.toString()}]`;
    } else {
      return `Optional.empty`;
    }
  }
}
