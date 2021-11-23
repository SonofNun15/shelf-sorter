import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as emojiData from '../emoji.json';

@Component({
  selector: 'app-emoji',
  template: `
    <span [ngStyle]="{'font-size': size + 'px'}" >
      {{emojiIcon}}
    </span>
  `,
  styles: [
  ]
})
export class EmojiComponent implements OnChanges {
  @Input() name: string = 'smile';
  @Input() size: string ='30';
  emojiIcon = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'].currentValue !== changes['name'].previousValue) {
      this.emojiIcon = (emojiData as any)[this.name];
    }
  }
}
