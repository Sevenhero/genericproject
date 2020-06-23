export class CopyObjectService {
  public static clone(source) {
    let copy;
    if (null == source || 'object' != typeof source) return source;
    if (source instanceof Date) {
      copy = new Date(source).toISOString().substring(0, 10);
      return copy;
    }
    if (source instanceof Array) {
      copy = [];
      for (let i = 0, len = source.length; i < len; i++) {
        copy[i] = this.clone(source[i]);
      }
      return copy;
    }
    if (source instanceof Object) {
      copy = {};
      for (let attr in source) {
        if (source.hasOwnProperty(attr)) copy[attr] = this.clone(source[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy source! Its type isn't supported.");
  }
}
