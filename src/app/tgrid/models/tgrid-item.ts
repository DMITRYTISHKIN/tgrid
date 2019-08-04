export class TGridItem {
  constructor(
    public id: any,
    public data: any,
    public index: number,
    public expand?: boolean,
    public visible?: boolean,
    public selected?: boolean,
  ) {}
}
