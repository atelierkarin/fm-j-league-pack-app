export class History {
  public updateDate: string;
  public version: string;
  public content: string[];
  public fmVersion: string;

  constructor(updateDate: string, version: string, content: string[], fmVersion: string) {
    this.updateDate = updateDate;
    this.version = version;
    this.content = content;
    this.fmVersion = fmVersion
  }
}