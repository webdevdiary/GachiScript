export namespace ArgsParser {

  export const getArgValue = (argName: string): string => {
    const processArgs: string[] = process.argv.slice(2);
    for (const arg of processArgs) {
      if (arg.indexOf(argName) === 0) {
        return arg.split('=')[1];
      }
    }
    return null;
  };

}
