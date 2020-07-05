import {OperationsStack} from '@/models/OperationsStack';
import {SpankParser} from '@/parsers/SpankParser';
import {QuotesParser} from '@/parsers/QuotesParser';
import {CodeIterator} from '@/models/CodeIterator';

export namespace OperationsParser {

  export const parseCode = (code: string): OperationsStack => {

    const operationsStack: OperationsStack = new OperationsStack();
    const result: OperationsStack = new OperationsStack();

    const codeIterator = new CodeIterator(code);

    while (codeIterator.iterate()) {
      SpankParser.SpankParser(operationsStack, codeIterator, result);
      QuotesParser.QuotesParser(operationsStack, codeIterator, result);
    }

    return result;
  }

}
