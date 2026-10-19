declare module "sanitize-html" {
  interface IOptions {
    allowedTags?: string[] | false;
    allowedAttributes?: Record<string, string[]> | false;
    allowedSchemes?: string[];
    allowedClasses?: Record<string, string[]>;
  }

  function sanitize(dirty: string, options?: IOptions): string;

  export default sanitize;
}
