type ObjectType = Record<string, boolean>;
type ArrayType = Array<ValueType>;
type ValueType = undefined | string | ObjectType | ArrayType;

export const classNames = (...args: Array<ValueType>): string | undefined => {
  const classNamesArr: string[] = [];

  const handleObject = (object: ObjectType) => {
    for (const key of Object.keys(object)) {
      if (object[key]) {
        classNamesArr.push(key);
      }
    }
  };

  const handleArray = (array: ArrayType) => {
    for (const item of array) {
      if (typeof item === 'string') {
        classNamesArr.push(item);
      } else if (Array.isArray(item)) {
        handleArray(item);
      } else if (typeof item === 'object') {
        handleObject(item);
      }
    }
  };

  handleArray(args);
  return classNamesArr.length > 0 ? classNamesArr.join(' ') : undefined;
};
