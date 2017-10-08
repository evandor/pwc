import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './../pipes/time-ago/time-ago';
import { TimeToGoPipe } from './../pipes/time-to-go/time-to-go';
@NgModule({
	declarations: [TimeAgoPipe,
    TimeToGoPipe],
	imports: [],
	exports: [TimeAgoPipe,
    TimeToGoPipe]
})
export class PipesModule {}
