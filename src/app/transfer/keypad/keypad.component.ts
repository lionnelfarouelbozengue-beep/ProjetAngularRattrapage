import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './keypad.component.html'
})
export class KeypadComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() maxLength: number = 4;
  @Output() codeChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('codeInput') codeInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    // Focus automatique pour ouvrir le clavier natif directement
    setTimeout(() => this.codeInput?.nativeElement.focus(), 100);
  }

  onInput(value: string) {
    // On garde uniquement les chiffres, dans la limite de maxLength
    const digitsOnly = value.replace(/\D/g, '').slice(0, this.maxLength);
    this.code = digitsOnly;
    this.codeChange.emit(this.code);

    // Validation automatique dès que le code atteint la longueur requise
    if (this.code.length === this.maxLength) {
      this.validate.emit(this.code);
    }
  }

  onValidate() {
    this.validate.emit(this.code);
  }

  onClose() {
    this.close.emit();
  }
}