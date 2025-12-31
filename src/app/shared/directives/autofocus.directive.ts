import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true,
})
export class AutofocusDirective implements OnInit {
  private el = inject(ElementRef<HTMLInputElement>);

  ngOnInit() {
    queueMicrotask(() => {
      this.el.nativeElement.focus();
    });
  }
}
