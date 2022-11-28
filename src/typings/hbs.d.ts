// declare module "*.hbs";
// also have tried:
// declare module "*.hbs" {
// const value: string;
// export default value;
// }
declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";

  declare const template: TemplateDelegate;

  export default template;
}
