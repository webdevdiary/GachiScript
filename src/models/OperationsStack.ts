import {GachiOperation} from '@/models/GachiOperation';

export class OperationsStack {

  private stack: GachiOperation[] = [];

  public push(operation: GachiOperation): void {
    this.stack.push(operation);
  }

  public pop(): GachiOperation {
    return this.stack.pop();
  }

  public getLast(): GachiOperation {
    return !!this.stack.length && this.stack[this.stack.length - 1];
  }

  public getArray(): GachiOperation[] {
    return this.stack;
  }

  public merge(operationsStack: OperationsStack): void {
    this.stack = [
      ... this.stack,
      ... operationsStack.getArray(),
    ];
  }

}
