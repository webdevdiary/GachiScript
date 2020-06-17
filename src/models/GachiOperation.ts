import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import {OperationsStack} from '@/models/OperationsStack';
import {ParsingStatusEnum} from '@/enums/ParsingStatusEnum';
import {ParsingData} from '@/types/ParsingData';

export class GachiOperation {

  constructor(operationKey: GachiOperationsEnum) {
    this.operationKey = operationKey;
  }

  private readonly operationKey: GachiOperationsEnum = null;
  private subOperations: OperationsStack = new OperationsStack();
  private value: string | number = null;
  private parsingStatus: ParsingStatusEnum = ParsingStatusEnum.NOT_PARSED;
  private parsingData: ParsingData = {};

  public getOperationKey(): GachiOperationsEnum {
    return this.operationKey;
  }

  public startParsing(): void {
    this.parsingStatus = ParsingStatusEnum.IS_PARSING;
  }

  public finishParsing(): void {
    this.parsingStatus = ParsingStatusEnum.PARSING_FINISHED;
  }

  public getParsingStatus(): ParsingStatusEnum {
    return this.parsingStatus;
  }

  public setSuboperations(subOperations: OperationsStack): void {
    this.subOperations.merge(subOperations);
  }

  public getSuboperations(): OperationsStack {
    return this.subOperations;
  }

  public mergeIntoParsingData(parsingData: ParsingData): void {
    this.parsingData = {
      ... this.parsingData,
      ... parsingData,
    };
  }

  public getParsingData(): ParsingData {
    return this.parsingData;
  }

  public setValue(value: string | number): void {
    this.value = value;
  }

  public getValue(): string | number {
    return this.value;
  }

}
