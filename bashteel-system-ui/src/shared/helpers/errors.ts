export const ERROR_MESSAGES = {
  '-1': {code: '-1', message: 'cervello not initialized yet'},
};

export const ERROR_CODES: Record<string, keyof (typeof ERROR_MESSAGES)> = {
  UN_INITIALIZED_ERROR: '-1',
};