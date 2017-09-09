import { Directive, ElementRef, Renderer, ViewChild } from '@angular/core';


/**
 * Generated class for the FocuserDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[focuser]' // Attribute selector
})
export class FocuserDirective {
  @ViewChild('sketchElement',{read: ElementRef}) sketchElement: ElementRef;
  tmpTest:any;

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello FocuserDirective Directive');
  }

  ngAfterViewInit(){
    this.tmpTest = this.sketchElement.nativeElement;
    console.log("tmpTest-Wert", this.tmpTest);
    // we need to delay our call in order to work with ionic ...
   /* setTimeout(() => {
        this.renderer.invokeElementMethod(this.tmpTest, 'focus', []);
    }, 0);*/
  }


}
