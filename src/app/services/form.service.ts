import { Injectable } from '@angular/core';
import { AdEditorInput } from './../domain/domain';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class FormService {

	constructor(private fb: FormBuilder) { }

	public getAdEditorInputFormGroup(input: AdEditorInput): FormGroup {
        return this.fb.group({
            headline1: [input.headline1, []],
            headline2: [input.headline2, []],
            url: [input.url, []],
            description: [input.description, []],
        });
    }

}
