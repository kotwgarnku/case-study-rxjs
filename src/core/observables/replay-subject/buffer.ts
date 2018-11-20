export class Buffer<T> {
  private buffer: T[]
  private tail: number

  constructor(private readonly bufferSize: number) {
    this.buffer = []
    this.tail = 0
  }

  push(value: T): void {
    this.buffer[this.tail] = value
    this.tail = (this.tail + 1) % this.bufferSize
  }

  content(): T[] {
    return [...this.buffer.slice(this.tail), ...this.buffer.slice(0, this.tail)]
  }
}
