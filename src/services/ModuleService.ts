import * as fs from "fs";
import {GachiModule} from '@/models/GachiModule';

export namespace ModuleService {

  export const loadGachiFile = (gachiFilePath: string): string => {
    try {
      return fs.readFileSync(gachiFilePath, 'utf-8');
    } catch (e) {
      throw new Error(`src/services/ModuleLoader.ts -> ModuleLoader.loadGachiFile: ${e.stack}`);
    }
  };

  export const loadModuleFile = (module: string): string => {
    try {
      return loadGachiFile(module + '/index.gachi');
    } catch (e) {
      throw new Error(`src/services/ModuleLoader.ts -> ModuleLoader.loadModuleFile: ${e.stack}`);
    }
  };

  export const createGachiModuleFromPath = (module: string): GachiModule => {
    try {
      const moduleFileContent = loadModuleFile(module);
      return new GachiModule(moduleFileContent);
    } catch (e) {
      throw new Error(`src/services/ModuleLoader.ts -> ModuleLoader.createGachiModuleFromPath: ${e.stack}`);
    }
  };

}
