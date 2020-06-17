import {OperationsStack} from '@/models/OperationsStack';
import {SpankParser} from '@/parsers/SpankParser';
import {QuotesParser} from '@/parsers/QuotesParser';

export namespace OperationsParser {

  export const parseCode = (code: string): OperationsStack => {

    const operationsStack: OperationsStack = new OperationsStack();
    const result: OperationsStack = new OperationsStack();

    for (const char of code) {
      SpankParser.SpankParser(operationsStack, char, result);
      QuotesParser.QuotesParser(operationsStack, char, result);
    }

    return result;
  }

}
