import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[clickable]',
  standalone: true,
  host: {
    '[class.clickable]': 'true',
    '[class.clickable--enabled]': 'enabled()',
    '[attr.role]': 'enabled() ? "button" : null',
    '[attr.tabindex]': 'enabled() ? 0 : null',
  },
})
export class ClickableDirective {
  enabled = input(true);

  // @HostListener('keydown.enter', ['$event'])
  // @HostListener('keydown.space', ['$event'])
  // onKeyActivate(event: KeyboardEvent) {
  //   if (!this.enabled()) return;
  //
  //   event.preventDefault();
  //
  //   // Trigger click on the host element
  //   (event.currentTarget as HTMLElement).click();
  // }
}

