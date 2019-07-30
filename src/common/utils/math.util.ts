// import * as validator from 'validator';

export const MathUtil = {
  /**
   * Rounds up
   */
  round(num: number, decimals: number): number {
    const decimal = Math.pow(10, decimals);
    return Math.round(num * decimal + Number.EPSILON) / decimal;
  },

  // isInteger(num: string) {
  //   return validator.isNumeric(num);
  // }
  // isInteger(num: number): boolean {
  //  return num === Math.floor(num);
  // }
}