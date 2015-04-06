import {Component, Template, If} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {TweenLite} from 'gsap/TweenLite';
import {TimelineLite} from 'gsap/TimelineLite';
import {CSSPlugin} from 'gsap/plugins/CSSPlugin';
import {Draggable} from 'gsap/utils/Draggable';
import {SnapSvg} from 'snapsvg/snap.svg';

@Component({
  selector: 'snail'
})
@Template({
  directives: [If],
  url: `templates/snail.html`
})
export class Snail {
  name:string;

  constructor() {
    // let $snailSvg = document.getElementById('snail');
    let rightEye = window.Snap('#auge');
    let leftEye = window.Snap('#auge_1_');
    let schnecke = window.Snap('#snail-body');
    let menu = document.getElementById('menu-wrapper');
    //menu.on('tap', function (event) {
    //  console.log(event);
    //});
    let colors = ['red', 'green', 'yellow', 'blue', 'greenyellow', 'purple'];
    let colorBody = ['purple', 'pink'];
    let a = colors.length - 1;
    let i, b = 0;
    let rotationSnap = 100 / 6;
    window.Draggable(menu, {
      type: 'rotation', throwProps: true, snap: function (endValue) {
        console.log(endValue);
      }
    });
    setInterval(() => {
      schnecke.attr({
        fill: colorBody[b]
      });
      if (b === 0) {
        b++;
      } else {
        b = 0;
      }
    }, 5000);
    setInterval(() => {
      this.name = colors[i];
      leftEye.attr({
        fill: colors[i]
      });

      rightEye.attr({
        fill: colors[a]
      });

      if (a === 0) {
        a = colors.length - 1;
        i = 0;
      } else {
        a--;
        i++
      }
    }, 500);
  }

;
  isTapped(event) {
    console.log(event.target);
  }

;
}
