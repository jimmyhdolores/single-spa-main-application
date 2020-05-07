import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpModule } from '@angular/http';
import { MatTreeModule} from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { TreeFolderComponent } from './components/tree-folder/tree-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    TreeFolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    GoogleChartsModule,
    MatTreeModule, MatIconModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
