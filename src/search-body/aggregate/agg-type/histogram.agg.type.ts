import { ESAggTypes } from "../../..";

export default class HistogramAggType implements ESAggTypes {
  private field: string;
  private interval: number;

  constructor(field: string, interval: number) {
    this.field = field;
    this.interval = interval;
  }

  public build() {
    const histogram: any = {};
    if (this.field !== null) {
      histogram.field = this.field;
    }
    if (this.interval !== null) {
      histogram.interval = this.interval;
    }
    return {
      histogram,
    };
  }
}
