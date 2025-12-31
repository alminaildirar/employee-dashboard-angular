import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true,
})
export class HighlightOnHoverDirective {
  @Input() appHighlightOnHover = 'rgba(37, 99, 235, 0.06)'; // primary'ye yakın

  @HostBinding('style.backgroundColor') bg = '';
  @HostBinding('style.transition') transition =
    'background-color 120ms ease, box-shadow 120ms ease, transform 120ms ease';

  @HostBinding('style.boxShadow') shadow = '';
  @HostBinding('style.transform') transform = '';

  @HostBinding('style.borderRadius') radius = '10px';

  @HostListener('mouseenter')
  onEnter() {
    this.bg = this.appHighlightOnHover;
    this.shadow = '0 8px 18px rgba(0,0,0,0.08)';
    this.transform = 'translateY(-1px)';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.bg = '';
    this.shadow = '';
    this.transform = '';
  }
}
