import { Directive, input } from '@angular/core';

@Directive({
  selector: '[panel]',
  standalone: true,
  host: {
    '[class.panel]': 'true',
    '[class.panel--clickable]': 'panelClickable()',
  },
})
export class PanelDirective {
  panelClickable = input(false);
}


