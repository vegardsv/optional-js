# Optional.js

A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value. Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present.

This is a value-based class; use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.

## Examples of usage

### Using "new" keyword

    const optional = new Optional("123");
    const optional = new Optional(null);

### Of

Returns an Optional with the specified present non-null value.
  
 const optional = Optional.of("123");

### empty

Returns an empty Optional instance.
const optional = Optional.empty()
