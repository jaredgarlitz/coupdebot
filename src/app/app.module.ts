import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule
    ],
  bootstrap: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    provideHttpClient()
  ]
})

export class AppModule { }