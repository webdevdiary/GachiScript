import {Accumulator} from '@/models/Accumulator';
import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {GachiOperation} from '@/models/GachiOperation';
import {ParsingStatusEnum} from '@/enums/ParsingStatusEnum';

export namespace QuotesParser {

  const accumulator: Accumulator = new Accumulator();

  export const QuotesParser = (
    operationsStack: OperationsStack,
    char: string,
    result: OperationsStack
  ): void => {

    try {

      if ((char === GachiOperationsEnum.SINGLE_QUOTE) && !operationsStack.getLast()) {
        operationsStack.push(new GachiOperation(GachiOperationsEnum.SINGLE_QUOTE));
        accumulator.clear();
        return;
      }

      if (operationsStack.getLast() && (operationsStack.getLast().getOperationKey() === GachiOperationsEnum.SINGLE_QUOTE)) {

        if ((operationsStack.getLast().getParsingStatus() !== ParsingStatusEnum.PARSING_FINISHED) && (char === '\'')) {

          operationsStack.getLast().startParsing();
          operationsStack.getLast().mergeIntoParsingData({
            '\'': (operationsStack.getLast().getParsingData()['\''] as number || 0) + 1,
          });

          if (operationsStack.getLast().getParsingData()['\''] === 1) {
            operationsStack.getLast().setValue(accumulator.getValue());
            operationsStack.getLast().finishParsing();
            result.push(operationsStack.pop());
            accumulator.clear();
            return;
          }

        }

      }

      accumulator.append(char);

    } catch (e) {
      throw new Error(`src/parsers/QuotesParser.ts -> QuotesParser: ${e.stack}`);
    }

  };

}
