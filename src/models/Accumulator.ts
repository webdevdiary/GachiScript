export class Accumulator {

  private accumulator = '';

  public append(char: string): void {
    this.accumulator += char;
  }

  public clear(): void {
    this.accumulator = '';
  }

  public getValue(): string {
    return this.accumulator;
  }

}
