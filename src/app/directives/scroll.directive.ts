import { Directive, ElementRef, OnInit, Renderer2, AfterViewInit, HostListener, ViewContainerRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements AfterViewInit, OnDestroy {
  public scrollOuter: HTMLElement;
  public scrollInner: HTMLElement;

  public container: HTMLElement;

  public delta = 0;

  private _mouseMoveFn: any;
  private _mouseDownFn: any;
  private _mouseUpFn: any;

  get maxScroll(): number {
    return this.container.scrollHeight - this.container.offsetHeight;
  }

  @HostListener('wheel', ['$event']) onWheel(e: WheelEvent) {
    e.preventDefault();

    const delta = e.deltaY || e.detail;
    this.delta += delta;
    if (this.delta < 0) {
      this.delta = 0;
    } else if (this.delta > this.maxScroll) {
      this.delta = this.maxScroll;
    }

    this.elementRef.nativeElement.scrollTo(0, this.delta);
  }

  @HostListener('scroll') onScroll() {
    const height = (this.delta / (this.container.scrollHeight / 100)) * (this.scrollOuter.offsetHeight / 100);
    this.renderer.setStyle(this.scrollInner, 'transform', `translateY(${height}px)`);
  }

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public viewContainer: ViewContainerRef
  ) {
    this.container = elementRef.nativeElement as HTMLElement;
  }

  ngOnDestroy() {
    this._mouseDownFn();
    this._mouseUpFn();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'scroll-container');

    const scrollContainer = this.renderer.createElement('div');
    this.renderer.addClass(scrollContainer, 'scroll-control-container');

    this.scrollOuter = this.renderer.createElement('div');
    this.renderer.addClass(this.scrollOuter, 'scroll-control-outer');

    this.scrollInner = this.renderer.createElement('div');
    this.renderer.addClass(this.scrollInner, 'scroll-control-inner');

    this.renderer.appendChild(scrollContainer, this.scrollOuter);
    this.renderer.appendChild(this.scrollOuter, this.scrollInner);
    this.renderer.setStyle(this.scrollOuter, 'height', `${this.container.clientHeight - 4}px`);

    this.renderer.appendChild(this.elementRef.nativeElement, scrollContainer);

    const height = this.container.offsetHeight / (this.container.scrollHeight / 100);
    this.renderer.setStyle(this.scrollInner, 'height', `${height}%`);

    this._mouseDownFn = this.renderer.listen(this.scrollOuter, 'mousedown', this._onMouseDown);
  }

  private _onMouseDown = (e): void => {
    this._mouseMoveFn = this.renderer.listen(document, 'mousemove', this._onMouseMove);
    this._mouseUpFn = this.renderer.listen(document, 'mouseup', () => {
      this._mouseMoveFn();
      this._mouseUpFn();
    });
  }


  private _onMouseMove = (e: MouseEvent): void => {
    e.stopPropagation();

    const per = (e.clientY - (this.scrollInner.offsetHeight / 2)) / ((this.scrollOuter.offsetHeight) / 100);
    this.delta = (this.container.scrollHeight / 100) * per;

    if (this.delta < 0) {
      this.delta = 0;
    } else if (this.delta > this.maxScroll) {
      this.delta = this.maxScroll;
    }

    this.elementRef.nativeElement.scrollTo(0, this.delta);
  }
}
