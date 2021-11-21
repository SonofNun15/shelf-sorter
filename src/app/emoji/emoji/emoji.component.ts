import { Component, Input, OnInit } from '@angular/core';
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
export class EmojiComponent implements OnInit {
  @Input() name: string = 'smile';
  @Input() size: string ='30';
  emojiIcon = '';

  ngOnInit() {
    this.emojiIcon = (emojiData as any)[this.name];
  }
}
