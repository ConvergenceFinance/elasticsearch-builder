import { ESAggTypes } from "../../..";

export default class CumulativeSumAggType implements ESAggTypes {
  private buckets_path: string;

  constructor(buckets_path: string) {
    this.buckets_path = buckets_path;
  }

  public build() {
    const cumulative_sum: any = {};
    if (this.buckets_path !== null) {
      cumulative_sum.buckets_path = this.buckets_path;
    }
    return {
      cumulative_sum,
    };
  }
}
