import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ChipColors } from '../shared/components-colors';
import { ComponentSizes } from '../shared/components.sizes';

@Component({
  selector: 'talon-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() color: ChipColors = 'default';

  @Input() size: ComponentSizes = 'small';

  @Output() removeClicked = new EventEmitter();

  @HostBinding('class')
  get classes(): string {
    return `color--${this.color} size--${this.size}`;
  }

  @Input()
  set isRemovable(removable: boolean) {
    this._removable = removable;
  }

  get isRemovable(): boolean {
    return this._removable;
  }

  private _removable = false;
}
