import {Component, Template} from 'angular2/angular2';
import {If} from 'angular2/angular2';
@Component({
  selector: 'hello'
})
@Template({
  inline: `<span *if="name">Hello, {{name}}!</span>`,
  directives: [If]
})
export class Hello {
  name:string;
  constructor() {
    this.name = 'World';
    setTimeout(() => {
      this.name = 'Snail fan'
    }, 2000);
  }
}
