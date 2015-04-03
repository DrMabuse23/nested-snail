import {Component, Template} from 'angular2/angular2';
import {If} from 'angular2/angular2';
import {TweenLite} from 'gsap/TweenLite';
import {TimelineLite} from 'gsap/TimelineLite';
import {CSSPlugin} from 'gsap/plugins/CSSPlugin';
import {Draggable} from 'gsap/utils/Draggable';
import {SnapSvg} from 'snapsvg/snap.svg';
@Component({
  selector: 'snail'
})
@Template({
  url: `templates/snail.html`
})
export class Snail {
  constructor() {
    var $snailSvg = document.getElementById('snail');
    var snapper = window.Snap('#Ebene_1');
    //var leftEye = snapper.path(document.getElementById('#auge_1_'));
    var leftEye = window.Snap('#auge_1_');
    var rightEye = window.Snap('#auge');
    let colors = ['red', 'green', 'yellow', 'blue', 'greenyellow', 'purple']
    let i = 0;
    let a = colors.length-1;
    setInterval(() => {
      leftEye.attr({
        fill: colors[i]
      });
      rightEye.attr({
        fill: colors[a]
      });
      console.log(colors[i], i);
      if (i === colors.length-1) {
        i = 0;
      } else {
        i++;
      }
      if (a === 0) {
        a = colors.length-1;
      } else {
        a--;
      }

    }, 500);

    //leftEye.paper.animate({r: 50}, 5000);
    console.log(snapper, leftEye);
    var tl = new window.TimelineLite();
    //dialog 1
    tl.from($snailSvg, 1.0, {scale:0.1, autoAlpha:1.0}).from($snailSvg, 1.0, { autoAlpha:1.0});
    // }, 2000);

  }
}
