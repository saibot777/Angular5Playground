import { ThreadsService } from '../common/services/threads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {

      this.threadsService.getUserThreads()
          .subscribe(console.log);

  }

}
