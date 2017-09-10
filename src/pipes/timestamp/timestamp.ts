import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  
  transform(value) {
		return moment(value).format('MMM DD, YYYY HH:mm'); 
	}

}
