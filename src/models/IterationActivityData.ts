import {UsedParsers} from '@/types/UsedParsers';

export class IterationActivityData {

  private usedParsers: UsedParsers = {};

  public setParserUsed(parserName: string): void {
    this.usedParsers = {
      ... this.usedParsers,
      [parserName]: true,
    };
  }

  public getUsedParsers(): UsedParsers {
    return this.usedParsers;
  }

}
