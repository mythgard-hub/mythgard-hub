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
export function handleInputChangeStateless(setter) {
  return e => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setter(value);
    return value;
  };
}
