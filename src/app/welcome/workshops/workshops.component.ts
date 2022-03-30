import { Component, OnInit } from '@angular/core';
// import { Workshop } from './workshop';
import { WORKSHOPS } from './mock-workshops';
import { WorkshopService } from './workshop.service';


// import {FileSystem} from 'fs'

// import { constants } from 'fs';
// import * as fs from 'fs/promises';



// const process = require('process');




@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {
  // WORKSHOPS: Workshop[] = [
  //   { id: 11, title: 'Tasse', shortDescription: 'tasse beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die tasse. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  //   { id: 12, title: 'Teekanne', shortDescription: 'teekanne beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die teekanne. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  //   { id: 13, title: 'Teller', shortDescription: 'Teller beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die Teller. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  //   { id: 14, title: 'Messer', shortDescription: 'Messer beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die Messer. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  //   { id: 15, title: 'Gabel', shortDescription: 'Gabel beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die Gabel. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  //   { id: 16, title: 'Löffel', shortDescription: 'Löffel beschreibung: Lorem ipsum dolor sit amet, consecteturadipiscing elit, sed do usmod tempor incididunt ut labore et', image:'', detailDescription: 'detail beschreibung über die Löffel. dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ecommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullpariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'},
  // ]


  // workshops: Workshop[] = [];
  workshops = WORKSHOPS;
  // workshops = this.WORKSHOPS;
  // public workshops: WORKSHOPS[] = [];


  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.getWorkshops();
    //  = this.workshopService.getWorkshops();
  }

  getWorkshops(): void {
    // WORKSHOPS;
    this.workshopService.getWorkshops();

    // this.workshopService.getWorkshops();
    // console.log("in workshop component")
  //   this.workshops = this.workshopService.getWorkshops();
  // }
    // this.workshops[0].title = process.cwd()

    // var fs = require('file-system');
    // this.workshops[0].title = fs.pwd();

    // try {
    //   await copyFile('source.txt', 'destination.txt');
    //   console.log('source.txt was copied to destination.txt');
    // } catch {
    //     await this.workshops[0].title = 'The file could not be copied';
    // }
    // TODO Pfad angeben, z.B. path = 'C:\vlc\workshops'
    // und aus diesem Verzeichnis alle unterzeichnisse auflisten

    
    // this.workshops = this.workshopService.getWorkshops();
    // this.workshopService.getWorkshops()
    //   .subscribe(workshops => this.workshops = workshops);
  // }

  // getWorkshops(): void {
  //   this.workshopService.getWorkshops().subscribe(workshops => this.workshops = workshops);
  // }

  // add, delete, update new features

}

// 1st version of diplaying data

}