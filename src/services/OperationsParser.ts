import {OperationsStack} from '@/models/OperationsStack';
import {SpankParser} from '@/parsers/SpankParser';
import {QuotesParser} from '@/parsers/QuotesParser';
import {ItTurnsMeOnParser} from '@/parsers/ItTurnsMeOnParser';
import {CodeIterator} from '@/models/CodeIterator';
import {IterationActivityData} from '@/models/IterationActivityData';

export namespace OperationsParser {

  export const parseCode = (code: string): OperationsStack => {

    const operationsStack: OperationsStack = new OperationsStack();
    const result: OperationsStack = new OperationsStack();

    const codeIterator = new CodeIterator(code);

    while (codeIterator.iterate()) {

      const iterationActivityData = new IterationActivityData();

      SpankParser.SpankParser(operationsStack, codeIterator, result, iterationActivityData);
      QuotesParser.QuotesParser(operationsStack, codeIterator, result, iterationActivityData);
      ItTurnsMeOnParser.ItTurnsMeOnParser(operationsStack, codeIterator, result, iterationActivityData);

      if (!Object.keys(iterationActivityData.getUsedParsers()).length) {

        const currentChar = codeIterator.getChar();

        if (
          currentChar !== ' ' &&
          !(currentChar.match(/\n/g) || []).length &&
          !(currentChar.match(/\r/g) || []).length
        ) {
          throw new Error(`unexpected symbol "${currentChar}"`);
        }
      }
    }

    return result;
  }

}
