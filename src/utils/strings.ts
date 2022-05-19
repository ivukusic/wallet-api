const { WEB_ROOT_PATH } = process.env;

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const constructURL = (path: string) => {
  return new URL(path, WEB_ROOT_PATH).toString();
};

export const capitalizeFirstLetter = (val: string): string =>
  val.charAt(0).toUpperCase() + val.slice(1);
