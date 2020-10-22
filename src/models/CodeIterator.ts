import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';

export class CodeIterator {

  constructor(code: string) {
    this.code = code;
    this.codeLinesContents = this.code.split(/\r?\n/g);

    const codeLinesNumber = this.codeLinesContents.length;

    const rLineBreaksCount = this.code.split(/\r/g).length;
    const nLineBreaksCount = this.code.split(/\n/g).length;
    const rnLineBreaksCount = this.code.split(/\r\n/g).length;

    if (rnLineBreaksCount === codeLinesNumber) {
      this.lineSeparator = '\r\n';
    } else if (rLineBreaksCount === codeLinesNumber) {
      this.lineSeparator = '\r';
    } else if (nLineBreaksCount === codeLinesNumber) {
      this.lineSeparator = '\n';
    }

    if (this.lineSeparator === '') {
      throw new Error(`Line separators error`);
    }
  }

  private readonly code: string = '';
  private readonly lineSeparator: string = '';
  private readonly codeLinesContents: string[] = [];
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

  public getIndentedCode(): string {
    const currentLineNumber = this.code.substr(0, this.position).split(this.lineSeparator).length;
    const currentLineContent = this.codeLinesContents[currentLineNumber - 1];

    let currentIndent = 0;
    for (const char of currentLineContent) {
      if (char === ' ') {
        currentIndent++;
      } else {
        break;
      }
    }

    const childrenIndent = currentIndent + 2;
    let childrenIndentContent = '';
    for (let x = 0; x < childrenIndent; x++) {
      childrenIndentContent += ' ';
    }

    let indentedCode = '';
    for (let x = currentLineNumber; x <= this.codeLinesContents.length; x++) {
      const nextLineContent = this.codeLinesContents[x];
      if (nextLineContent.indexOf(childrenIndentContent) === 0 && nextLineContent[childrenIndent] !== ' ') {
        indentedCode += nextLineContent + this.lineSeparator;
      } else if (nextLineContent.indexOf(' ') === 0) {
        throw new Error(`Indent error at line ${x + 1}`);
      } else {
        break;
      }
    }

    this.position += indentedCode.length + 1;

    return indentedCode;
  }

  public iterate(): boolean {
    if (this.position >= (this.code.length - 1)) {
      return false;
    }

    this.position++;
    return true;
  }
}
