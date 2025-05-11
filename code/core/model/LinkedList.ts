export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: LinkedListNode<T>) {
    if (!this.head) {
      this.head = value;
      this.tail = value;
      this.length = 1;
    } else {
      if (this.tail != null) {
        this.tail.next = value;
        value.prev = this.tail;
        this.tail = value;
        this.length++;
      }
    }
  }

  get(index: number): LinkedListNode<T> | null {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  find(predicate: (value: T) => boolean): LinkedListNode<T> | null {
    let current = this.head;

    while (current) {
      if (predicate(current.value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  remove(value: LinkedListNode<T>) {
    if (value.prev) {
      value.prev.next = value.next;
    } else {
      this.head = value.next;
    }

    if (value.next) {
      value.next.prev = value.prev;
    } else {
      this.tail = value.prev;
    }

    this.length--;
  }

  removeWhere(predicate: (value: T) => boolean) {
    let current = this.head;

    while (current) {
      const next = current.next; // Store next node before removing current
      if (predicate(current.value)) {
        this.remove(current);
      }
      current = next;
    }
  }

  asList() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }

  static fromList<T>(list: T[]) {
    const linkedList = new LinkedList<T>();

    for (const value of list){
      linkedList.append(new LinkedListNode(value));
    }
    return linkedList;
  }
}
