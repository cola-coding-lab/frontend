import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from '../../welcome/workshops/workshop.service';
import { WorkshopDetail } from '../../welcome/workshops/workshop-detail.model';
import { db, DbWorkshop } from '../../../util/db/db';
import { v4 } from 'uuid';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: [ './workshop.component.scss' ],
})
export class WorkshopComponent implements OnInit {
  public workshop?: WorkshopDetail;
  public currentLesson: number = 0;
  private workshopId?: string;

  constructor(
    private route: ActivatedRoute,
    private workshopsService: WorkshopService,
  ) {
    this.route.params.subscribe(params => this.workshopId = params['id']);
  }

  ngOnInit(): void {
    if (!this.workshopId) {
      console.log('TODO: Redirect to Workshops!');
      return;
    }
    this.workshopsService.workshop$(this.workshopId).subscribe({
      next: response => {
        this.workshop = { ...response, id: v4() };
        if (this.workshop) {
          db.workshops.add(this.workshop as DbWorkshop);
        }
      },
      error: error => {
        console.error(error);
        console.log('TODO: Redirect to Workshops!');
      },
    });
    console.log(this.workshopId);
  }

  public nextLesson(): void {
    this.currentLesson = (this.currentLesson + 1) % (this.workshop?.lessons.length || 0);
  }

  public previousLesson(): void {
    const n = this.workshop?.lessons.length || 0;
    // JS Modulo Bug: https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
    this.currentLesson = (((this.currentLesson - 1) % n) + n) % n;
  }
}
