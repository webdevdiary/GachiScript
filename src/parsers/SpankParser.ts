import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {GachiOperation} from '@/models/GachiOperation';
import {OperationsParser} from '@/services/OperationsParser';
import {CodeIterator} from '@/models/CodeIterator';
import {IterationActivityData} from '@/models/IterationActivityData';

export namespace SpankParser {

  export const SpankParser = (
    operationsStack: OperationsStack,
    codeIterator: CodeIterator,
    result: OperationsStack,
    iterationActivityData: IterationActivityData,
  ): void => {

    try {

      if (codeIterator.isOperation(GachiOperationsEnum.SPANK)) {
        iterationActivityData.setParserUsed('SpankParser');
        operationsStack.push(new GachiOperation(GachiOperationsEnum.SPANK));
        operationsStack.getLast().startParsing();
        return;
      }

      if (operationsStack.getLast() && (operationsStack.getLast().getOperationKey() === GachiOperationsEnum.SPANK)) {
        iterationActivityData.setParserUsed('SpankParser');

        const codeBetween = codeIterator.getCodeBetween('(', ')');

        if (codeIterator.getChar() === ' ') {
          return;
        } else if (codeBetween !== false) {
          operationsStack.getLast().finishParsing();
          operationsStack.getLast().setSuboperations(OperationsParser.parseCode(codeBetween as string));
          result.push(operationsStack.pop());
        } else {
          throw new Error(`unexpected symbol "${codeIterator.getChar()}"`);
        }
      }

    } catch (e) {
      throw new Error(`src/parsers/SpankParser.ts -> SpankParser: ${e.stack}`);
    }
  };

}
