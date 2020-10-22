import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {GachiOperation} from '@/models/GachiOperation';
import {OperationsParser} from '@/services/OperationsParser';
import {CodeIterator} from '@/models/CodeIterator';
import {IterationActivityData} from '@/models/IterationActivityData';

export namespace ItTurnsMeOnParser {

  export const ItTurnsMeOnParser = (
    operationsStack: OperationsStack,
    codeIterator: CodeIterator,
    result: OperationsStack,
    iterationActivityData: IterationActivityData,
  ): void => {

    try {

      if (codeIterator.isOperation(GachiOperationsEnum.IT_TURNS_ME_ON)) {
        iterationActivityData.setParserUsed('ItTurnsMeOnParser');
        operationsStack.push(new GachiOperation(GachiOperationsEnum.IT_TURNS_ME_ON));
        operationsStack.getLast().startParsing();
        return;
      }

      if (operationsStack.getLast() && (operationsStack.getLast().getOperationKey() === GachiOperationsEnum.IT_TURNS_ME_ON)) {
        iterationActivityData.setParserUsed('ItTurnsMeOnParser');

        const codeBetween = codeIterator.getCodeBetween('(', ')');

        if (codeIterator.getChar() === ' ') {
          return;
        } else if (codeBetween !== false) {

          if (!(codeBetween as string).length) {
            throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation parameters error`);
          }

          const unparsedParametersArray = (codeBetween as string).split(',');

          let slaveParam = null;
          let punishmentParam = null;
          for (const unparsedParameter of unparsedParametersArray) {
            const trimmedParam = unparsedParameter.replace(/\s/g, '');
            const [paramName, paramValue] = trimmedParam.split('=');

            if (paramName === 'slave' && slaveParam === null) {
              slaveParam = paramValue;
            } else if (paramName === 'punishment' && punishmentParam === null) {
              punishmentParam = paramValue;
            } else if (paramName === 'slave') {
              throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation: duplicate ${paramName} param error`);
            } else if (paramName === 'punishment') {
              throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation: duplicate ${paramName} param error`);
            } else {
              throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation doesn't have ${paramName} param`);
            }
          }

          if (slaveParam === null) {
            throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation: no slave param error`);
          }

          if (punishmentParam === null) {
            throw new Error(`${GachiOperationsEnum.IT_TURNS_ME_ON} operation: no punishment param error`);
          }

          const indentedCode = codeIterator.getIndentedCode();

          operationsStack.getLast().finishParsing();
          operationsStack.getLast().mergeIntoParsingData({slave: slaveParam, punishment: punishmentParam});
          operationsStack.getLast().setSuboperations(OperationsParser.parseCode(indentedCode));
          result.push(operationsStack.pop());
        } else {
          throw new Error(`unexpected symbol "${codeIterator.getChar()}"`);
        }
      }

    } catch (e) {
      throw new Error(`src/parsers/ItTurnsMeOnParser.ts -> ItTurnsMeOnParser: ${e.stack}`);
    }
  };

}
