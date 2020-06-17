import {ModuleService} from '@/services/ModuleService';
import {OperationsStack} from '@/models/OperationsStack';
import {GachiOperationsEnum} from '@/enums/GachiOperationsEnum';
import * as fs from "fs";

export class Transpiler {

  constructor(gachiModulePath: string) {
    this.gachiModulePath = gachiModulePath;
  }

  private readonly gachiModulePath: string = null;
  private javaScriptCode: string = null;

  public transpile(): void {
    try {

      const gachiModule = ModuleService.createGachiModuleFromPath(this.gachiModulePath);
      const operationsStack = gachiModule.parse();
      this.javaScriptCode = this.generateJavaScriptCode(operationsStack);

    } catch (e) {
      throw new Error(`src/transpiler.ts -> Transpiler.transpile: ${e.stack}`);
    }
  }

  public createJavaScriptFile(destinationDirectory: string, fileName: string): void {
    fs.mkdirSync(destinationDirectory, { recursive: true });
    fs.writeFileSync(`${destinationDirectory}/${fileName}.js`, this.javaScriptCode);
  }

  private generateJavaScriptCode(operationsStack: OperationsStack): string {

    let javaScriptCode = '';

    for (const operation of operationsStack.getArray()) {

      if (operation.getOperationKey() === GachiOperationsEnum.SPANK) {
        javaScriptCode += `alert(${this.generateJavaScriptCode(operation.getSuboperations())})`;
      }

      if (operation.getOperationKey() === GachiOperationsEnum.SINGLE_QUOTE) {
        javaScriptCode += `'${operation.getValue()}'`;
      }
    }

    return javaScriptCode;
  }

}
