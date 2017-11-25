import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';

import { ThreadsService } from './common/services/threads.service';


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
