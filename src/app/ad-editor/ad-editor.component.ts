import { Component, ViewChild, Injectable, Input, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdEditorOutput, AdGroup, AdEditorInput } from './../domain/domain';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'app-ad-editor',
	templateUrl: './ad-editor.component.html',
	styleUrls: ['./ad-editor.component.css']
})
export class AdEditorComponent implements OnInit {

	@Input() form: FormGroup;
	private cursorPosition: number;
	private selectedInputField: any;
	adOutputs: AdEditorOutput[] = <AdEditorOutput[]>[];
	parsedInput: any;
	adgroups: AdGroup[] = <AdGroup[]>[];
	adgroupNameTemplate = "[adgroup_name]";

	constructor(private http: Http) { }

	ngOnInit() {
	}

	private setCursorPosition(inputField) {
		let selectionEnd = inputField.inputEl.nativeElement.selectionEnd;
		this.cursorPosition = selectionEnd;
		this.selectedInputField = inputField.id;
		//console.log(this.selectedInputField + ":" + this.cursorPosition);
	}

	private addAdGroupName() {
		let control = this.form.controls[this.selectedInputField];
		let previousValue = control.value != null ? control.value : "";
		control.setValue([previousValue.slice(0, this.cursorPosition), this.adgroupNameTemplate, previousValue.slice(this.cursorPosition)].join(''));
	}

	private submit() {
		this.generateAdOutputs();
	}

	private getAdOutputsFromObject(input: any) {
		this.recurseOverObject(input);
		this.adgroups.forEach(adgroup => {
			let adoutput = new AdEditorOutput();
			adoutput.adgroup = adgroup.name;
			adoutput.headline1 = this.replaceAll(this.form.controls['headline1'].value, this.adgroupNameTemplate, adgroup.name);
			adoutput.headline2 = this.replaceAll(this.form.controls['headline2'].value, this.adgroupNameTemplate, adgroup.name);
			adoutput.url = this.replaceAll(this.form.controls['url'].value, this.adgroupNameTemplate, adgroup.name);
			adoutput.description = this.replaceAll(this.form.controls['description'].value, this.adgroupNameTemplate, adgroup.name);

			this.adOutputs.push(adoutput);
		})
	}

	private replaceAll(input: string, search: string, replacement: string) {
		var target = input;
		//return target.replace(new RegExp(search, "g"), replacement);
		return input.split(search).join(replacement)
	};

	private recurseOverObject(obj) {
		for (var k in obj) {
			if (!obj.hasOwnProperty(k))
				continue;

			if (k == "adgroups") {
				if (obj[k][0] != null) {
					let adgroup = obj[k][0];
					this.adgroups.push(adgroup);
				}
				return;
			}

			if ((typeof obj[k] == "object" || typeof obj[k] == "array") && obj[k] !== null)
				this.recurseOverObject(obj[k]);
		}
	}

	private generateAdOutputs() {
		this.adOutputs = null;
		this.http.get("./inputData.json")
			.map((res: any) => res.json())
			.subscribe(data => {
				this.parsedInput = data;
				this.getAdOutputsFromObject(this.parsedInput);
				console.log(this.parsedInput);
			}, error => console.log(error));



		// let list = <AdEditorOutput[]>[];

		// list[0] = new AdEditorOutput();
		// list[0].headline1 = "TestHeadline1";
		// list[0].headline2 = "TestHeadline2";
		// list[0].url = "sdfgsdfg";
		// list[0].description = "adgsd";

		// list[1] = new AdEditorOutput();
		// list[1].headline1 = "TestHeadline1";
		// list[1].headline2 = "TestHeadline2";
		// list[1].url = "sdfgsdfg";
		// list[1].description = "adgsd";

		// list[2] = new AdEditorOutput();
		// list[2].headline1 = "TestHeadline1";
		// list[2].headline2 = "TestHeadline2";
		// list[2].url = "sdfgsdfg";
		// list[2].description = "adgsd";

		// list[3] = new AdEditorOutput();
		// list[3].headline1 = "TestHeadline1";
		// list[3].headline2 = "TestHeadline2";
		// list[3].url = "sdfgsdfg";
		// list[3].description = "adgsd";

		// return list;
	}
}
