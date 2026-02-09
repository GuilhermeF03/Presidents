import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  // Add a class to the component root element
  @HostBinding('class.panel-container') panelClass = true;
}
