export function handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

// pass a setter received from useState (react hooks)
// returns function you can use as an onChange event
// handler.
export function handleInputChangeHooks(setter) {
  return e => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setter(value);
    return value;
  };
}

export function submitOnEnter(e, onSubmit) {
  const enterKey = 13;

  if (
    e &&
    e.keyCode &&
    e.keyCode === enterKey &&
    typeof onSubmit === 'function'
  ) {
    onSubmit(e);
  }
}
