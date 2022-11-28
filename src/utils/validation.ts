export default class Validation {
  private static valid(value: string, regularEx: string, flags: string = "") {
    const rExp: RegExp = new RegExp(regularEx, flags);

    return rExp.test(value);
  }

  static validName(value: string) {
    return Validation.valid(value, "^(?=.*?[А-ЯA-Z])[а-яА-Яa-zA-Z-]+$");
  }

  static validLogin(value: string) {
    return Validation.valid(value, "^(?=.*?[A-Za-z])[a-zA-Z0-9-_]{3,20}$");
  }

  static validPass(value: string) {
    return Validation.valid(value, "^(?=.*?[A-ZА-Я])(?=.*?[0-9])[\\S]{8,40}$");
  }

  static validEmail(value: string) {
    return Validation.valid(value, "^[a-z'\"<>.^*()%!$-]+@[a-z]+.[a-z]*$", "i");
  }

  static validPhone(value: string) {
    return Validation.valid(value, "^\\+?[\\d]{10,15}$");
  }
  //   if (/^\+?[\d]{10,15}$/.test(value)) {

  static validMsg(value: string) {
    return Validation.valid(value, "^.+$");
  }

  // static checkFields(fields: Array<Block>) {
  //   let fail = false;
  //   let toServer: Record<string, string> = {};

  //   fields.forEach((child) => {
  //     const inputElement = child.element!.querySelector("input");
  //     if (inputElement !== null) {
  //       let name = inputElement!.name;
  //       let value = inputElement!.value.trim();

  //       toServer[name] = value;

  //       // if (!child.props.funcValid.call(child, value)) {
  //       if (!child.isFieldOk(value)) {
  //         fail = true;
  //       }
  //     }
  //   });

  //   return { fail, toServer };
  // }
}
