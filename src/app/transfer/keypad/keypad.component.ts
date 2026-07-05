import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keypad.component.html'
})
export class KeypadComponent {
  @Input() code: string = '';
  @Input() maxLength: number = 4;
  @Output() codeChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  keys = ['1','2','3','4','5','6','7','8','9','','0','X'];

  press(key: string) {
    if (key === 'X') {
      const updated = this.code.slice(0, -1);
      this.code = updated;
      this.codeChange.emit(updated);
      return;
    }
    if (key === '' ) return;
    if (this.code.length < this.maxLength) {
      const updated = this.code + key;
      this.code = updated;
      this.codeChange.emit(updated);
    }
  }

  onValidate() {
    this.validate.emit(this.code);
  }

  onClose() {
    this.close.emit();
  }
}