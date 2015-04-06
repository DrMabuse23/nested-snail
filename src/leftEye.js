import {Component, Template} from 'angular2/angular2';
import {If} from 'angular2/angular2';
@Component({
  selector: 'left-eye'
})

@Template({
  inline: `<path id="auge_1_"
    *if="leftEyeColor" fill-rule="evenodd" clip-rule="evenodd"
    fill={{leftEyeColor}}
    d="M266.287,34.5c13.669,0,24.75,11.081,24.75,24.75,S279.956,84,266.287,84s-24.75-11.081-24.75-24.75S252.618,34.5,266.287,34.5z"
  />`,
  directives: [If]
})
export class LeftEye {
  leftEyeColor:string;
  constructor(){
    let i = 0;
    let colors = ['red', 'green', 'yellow', 'blue', 'greenyellow', 'purple'];
    this.leftEyeColor = colors[colors.length-1];
    setInterval(() => {
      this.leftEyeColor = colors[i];
      console.log(this.leftEyeColor, i);
      if (i === colors.length-1) {
        i = 0;
      } else {
        i++;
      }
    }, 500);
  }
};
