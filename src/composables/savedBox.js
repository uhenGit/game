class Box {
  constructor(name) {
    this.name = name;
  }

  getSavedBox() {
    const savedBox = localStorage.getItem(this.name);

    return savedBox ? JSON.parse(savedBox) : { boxHeight: 0, boxWidth: 0 };
  }

  saveBox(box) {
    localStorage.setItem(this.name, JSON.stringify(box));
  }

  clearBox() {
    localStorage.removeItem(this.name);
  }
}

export default Box;
