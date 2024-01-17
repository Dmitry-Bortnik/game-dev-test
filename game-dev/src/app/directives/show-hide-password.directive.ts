import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective implements OnChanges {
  @Input('appShowHidePassword') hidePassword!: boolean;

  constructor (
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  toggle(type: string): void {
    this.renderer.setAttribute(this.el.nativeElement, 'type', type)
  }

  ngOnChanges(): void {
    this.toggle(this.hidePassword ? 'password' : 'text')
  }

}
