import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdEditorComponent } from './ad-editor/ad-editor.component';
import { FormService } from './services/form.service';

import { MdlModule } from 'angular2-mdl';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
	declarations: [
		AppComponent,
		AdEditorComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MdlModule,
		SlimLoadingBarModule,
		ReactiveFormsModule
	],
	providers: [FormService],
	bootstrap: [AppComponent]
})
export class AppModule { }
