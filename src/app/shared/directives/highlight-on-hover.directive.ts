import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true,
})
export class HighlightOnHoverDirective {
  @Input() appHighlightOnHover = 'var(--color-bg)';

  @HostBinding('style.backgroundColor')
  bg = '';

  @HostBinding('style.transition')
  transition = 'background-color 120ms ease';

  @HostListener('mouseenter')
  onEnter() {
    this.bg = this.appHighlightOnHover;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.bg = '';
  }
}
