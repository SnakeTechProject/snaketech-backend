interface ILengthLimit {
  min?: number,
  max?: number,
}

class Validate {
  private static uuidV4RegEx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  private static emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  public static isNotEmpty = (param: string | number): boolean => {
    return !(param == null || param == undefined || param === '');
  };

  public static isString = (param: string): boolean => {
    return (typeof param == 'string' && typeof param != 'number');
  };

  public static isNumber = (param: number): boolean => {
    return (!isNaN(param) && typeof param == 'number');
  };

  public static contentLengthLimit = (param: string | Array<string>, {min = 0, max = 0}: ILengthLimit): boolean => {
    if (!Array.isArray(param) && !this.isString(param)) return !1;

    return (max > min)
      ? (param.length >= min && param.length <= max)
      : (param.length >= min);
  };

  public static id = (id: number): boolean => {
    return (this.isNotEmpty(id) && this.isNumber(id));
  };

  public static uuid = (uuid: string): boolean => {
    return (this.uuidV4RegEx.test(uuid));
  };

  public static email = (email: string): boolean => {
    return (this.emailRegEx.test(email));
  };
}

export default Validate;
