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
}
