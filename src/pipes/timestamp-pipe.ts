import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'timestampPipe'
})
export class TimestampPipe{
	
	transform(value) {
		return moment(value).format('DD MMM YYYY'); 
	}
}