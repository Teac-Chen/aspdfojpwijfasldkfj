const number = {
  update(el) {
    if (el.value !== '') {
      el.value = el.value.replace(/[^0-9.]+/g, '');
    }
  }
}
export {
  number
}
