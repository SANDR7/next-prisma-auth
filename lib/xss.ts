import xss from 'xss';

export const validateString = (value: string): string => {
  return xss(value, {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
};
