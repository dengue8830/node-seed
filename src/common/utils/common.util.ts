export const CommonUtil = {
  /**
   * Checks if a value exists.
   * Main porpouse is consider the case when zero is a valid
   * value but simple existence check (!!0) returns false.
   */
  exists(value: any): boolean {
    return !!value || value === 0;
  },

  // Checks if the environment is production.
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
}