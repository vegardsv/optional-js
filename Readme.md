# Optional.js

A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value. Additional methods that depend on the presence or absence of a contained value are provided, such as orElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present.

## Examples of usage

    function head(xs){
        if (xs.length > 0){
            return Optional.of(xs[xs.length -1]);
        } else {
            return Optional.empty();
        }
    }

    head([[1,2,3],[4,5,6]])
        .flatMap(head)
        .map(x => x + 1)
        .filter(x => x > 0)
        .ifPresent(console.log)
