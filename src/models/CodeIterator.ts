import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';

export class CodeIterator {

  constructor(code: string) {
    this.code = code;
  }

  private code = '';
  private position = -1;

  public getCurrentPosition(): number {
    return this.position;
  }

  public isOperation(operation: GachiOperationsEnum): boolean {
    if (this.code.indexOf(operation, this.position) === this.position) {
      this.position += operation.length - 1;
      return true;
    }
    return false;
  }

  public getChar(): string {
    return this.code[this.position];
  }

  public getCodeBetween(openString: string, closeString: string): string | boolean {
    if (this.code.indexOf(openString, this.position) === this.position) {
      const startIndex = this.position + openString.length;

      let openTimes = 1;
      let closeTimes = 0;
      let x = startIndex;
      for (; x < this.code.length; x++) {
        if (this.code.indexOf(closeString, x) === x) {
          closeTimes++;
        } else if (this.code.indexOf(openString, x) === x) {
          openTimes++;
        }

        if (openTimes === closeTimes) break;
      }

      if (openTimes === closeTimes) {
        const codeBetweenLength = x - startIndex;
        this.position += codeBetweenLength + 1;
        return this.code.substr(startIndex, codeBetweenLength);
      }
    }

    return false;
  }

  public iterate(): boolean {
    if (this.position >= (this.code.length - 1)) {
      return false;
    }

    this.position++;
    return true;
  }
}
