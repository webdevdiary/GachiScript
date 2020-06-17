import {Transpiler} from '@/services/Transpiler'
import {ArgsParser} from '@/services/ArgsParser';

const gachiModulePath = ArgsParser.getArgValue('gachiModule');
const outputDir = ArgsParser.getArgValue('outputDir');

const transpiler = new Transpiler(gachiModulePath);
transpiler.transpile();
transpiler.createJavaScriptFile(outputDir, 'index');
