import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormService} from './services/form.service';
import {AdEditorInput} from './domain/domain';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private form: FormGroup;

	constructor(private formService: FormService){
		this.form = this.formService.getAdEditorInputFormGroup(new AdEditorInput());
	}
	
}
