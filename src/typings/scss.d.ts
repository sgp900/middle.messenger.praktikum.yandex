declare module "*.scss";
// also have tried:
declare module "*.scss" {
  const value: string;
  export default value;
}
