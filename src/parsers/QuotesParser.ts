import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {GachiOperation} from '@/models/GachiOperation';
import {CodeIterator} from '@/models/CodeIterator';

export namespace QuotesParser {

  export const QuotesParser = (
    operationsStack: OperationsStack,
    codeIterator: CodeIterator,
    result: OperationsStack
  ): void => {

    try {

      if (codeIterator.isOperation(GachiOperationsEnum.SINGLE_QUOTE) && !operationsStack.getLast()) {
        operationsStack.push(new GachiOperation(GachiOperationsEnum.SINGLE_QUOTE));
        operationsStack.getLast().startParsing();
      }

      if (operationsStack.getLast() && (operationsStack.getLast().getOperationKey() === GachiOperationsEnum.SINGLE_QUOTE)) {
        const codeBetween = codeIterator.getCodeBetween('\'', '\'');
        operationsStack.getLast().setValue(codeBetween as string);
        operationsStack.getLast().finishParsing();
        result.push(operationsStack.pop());
        return;
      }

    } catch (e) {
      throw new Error(`src/parsers/QuotesParser.ts -> QuotesParser: ${e.stack}`);
    }

  };

}
