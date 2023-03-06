# VCL Frontend

Frontend for Virtual Coding Lab (VCL).

![demo](demo.gif)

Also includes [codemirror](https://codemirror.net/) for future updates.

## Prerequisites

* [Node.js](https://nodejs.org/en/)
  * Recommended: Current [LTS Version](https://nodejs.org/en/download/)
  * See also: [NVM](https://github.com/nvm-sh/nvm)
* [NPM](https://www.npmjs.com/) (comes with Node.js)
* [Angular CLI](https://angular.io/cli)
  * `npm install -g @angular/cli` to install Angular CLI globally
* Webbrowser with Devtools

At the current state, there is no communication with
the [backend](https://mode.fh-joanneum.at/cola/editor/cola-api-service).  
Later you also will need a local (or remote) connection to it, docs will be updated then.

## First steps

1. Clone the project  
   `git clone git@mode.fh-joanneum.at:cola/vcl/frontend.git`
2. Switch into directory  
   `cd frontend`
3. Install node dependencies  
   `npm ci`
4. Run [Development server](#development-server) and open Browser on <http://localhost:4200/>  
   `ng serve`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



### Draft chooser...
1. HeaderComponent.html (extend HTML) -> Dropdown = "Draft 1", "Draft 2", "Draft 3", ...
2. HeaderComponent.ts -> function "changeDraft(draft: string | number)" -> this.draftService.setDraft(draft)
3. (new) DraftService.ts -> 
  ```
  {
    public draftObs: Observable...
    private currentDraft: string | number
    public getDraft(): Observable<string | number> {
      return draftObs
    }
    public setDraft(draft: string | number) {
      draftObs.next(draft);
    }
  }
  ```
4. WelcomeComponent.ts + WorkshopsComponent.ts -> use DraftService via Constructor
   1. draftService.getDraft()
   2. instance variable (e.g. "draft")
5. WelcomeComponent.html + WorkshopsComponent.html -> only display chosen draft ... *ngIf 
