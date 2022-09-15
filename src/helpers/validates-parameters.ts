interface ILengthLimit {
  min?: number,
  max?: number,
}

class Validate {
  public isNotEmpty = (param: string | number): boolean => {
    return !(param == null || param == undefined || param === '');
  };

  public isString = (param: string): boolean => {
    return (typeof param == 'string' && typeof param != 'number');
  };

  public isNumber = (param: number): boolean => {
    return (!isNaN(param) && typeof param == 'number');
  };

  public contentLengthLimit = (param: string | Array<string>, {min = 0, max = 0}: ILengthLimit): boolean => {
    if (!Array.isArray(param) && !this.isString(param)) return !1;

    return (max > min)
      ? (param.length >= min && param.length <= max)
      : (param.length >= min);
  };

  public id = (id: number): boolean => {
    return (this.isNotEmpty(id) && this.isNumber(id));
  };

  public uuid = (userId: string): boolean => {
    return (this.isNotEmpty(userId) && this.isString(userId));
  };
}

export default Validate;
