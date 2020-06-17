import {Accumulator} from '@/models/Accumulator';
import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {GachiOperation} from '@/models/GachiOperation';
import {ParsingStatusEnum} from '@/enums/ParsingStatusEnum';
import {OperationsParser} from '@/services/OperationsParser';

export namespace SpankParser {

  const accumulator: Accumulator = new Accumulator();

  export const SpankParser = (
    operationsStack: OperationsStack,
    char: string,
    result: OperationsStack
  ): void => {

    try {

      if ((accumulator.getValue() === GachiOperationsEnum.SPANK) && !operationsStack.getLast()) {
        operationsStack.push(new GachiOperation(GachiOperationsEnum.SPANK));
        accumulator.clear();
      }

      if (operationsStack.getLast() && (operationsStack.getLast().getOperationKey() === GachiOperationsEnum.SPANK)) {

        if ((operationsStack.getLast().getParsingStatus() === ParsingStatusEnum.NOT_PARSED) && (char === '(')) {
          operationsStack.getLast().startParsing();
          operationsStack.getLast().mergeIntoParsingData({
            '(': (operationsStack.getLast().getParsingData()['('] as number || 0) + 1,
          });
          accumulator.clear();
          return;
        }

        if ((operationsStack.getLast().getParsingStatus() === ParsingStatusEnum.IS_PARSING) && (char === ')')) {

          operationsStack.getLast().mergeIntoParsingData({
            ')': (operationsStack.getLast().getParsingData()[')'] as number || 0) + 1,
          });

          if (operationsStack.getLast().getParsingData()['('] === operationsStack.getLast().getParsingData()[')']) {
            operationsStack.getLast().finishParsing();
            operationsStack.getLast().setSuboperations(OperationsParser.parseCode(accumulator.getValue()));
            accumulator.clear();
          }
          result.push(operationsStack.pop());
          return;
        }

        if (operationsStack.getLast().getParsingStatus() === ParsingStatusEnum.NOT_PARSED) {
          if (char === ' ') {
            accumulator.clear();
            return;
          } else {
            throw new Error(`unexpected symbol "${char}"`)
          }
        }
      }

      accumulator.append(char);

    } catch (e) {
      throw new Error(`src/parsers/SpankParser.ts -> SpankParser: ${e.stack}`);
    }
  };

}
