export class Item {
  id?: number;
  name: string;
  value: number;

  constructor(name: string, value: number, id?: number) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
