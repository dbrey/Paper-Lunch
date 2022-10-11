Object.defineProperty(String.prototype, "insert", {
  value: function (index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  },
  writable: true,
  configurable: true
});