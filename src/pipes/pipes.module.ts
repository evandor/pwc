import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './../pipes/time-ago/time-ago';

@NgModule({
	declarations: [TimeAgoPipe],
	imports: [],
	exports: [TimeAgoPipe]
})
export class PipesModule {}
