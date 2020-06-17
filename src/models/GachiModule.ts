import {OperationsParser} from '@/services/OperationsParser';
import {OperationsStack} from '@/models/OperationsStack';

export class GachiModule {

  constructor(moduleFileContent: string) {
    this.moduleFileContent = moduleFileContent;
  }

  private readonly moduleFileContent: string = null;

  public parse(): OperationsStack {
    return OperationsParser.parseCode(this.moduleFileContent);
  }

}
