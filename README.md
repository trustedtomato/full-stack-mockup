# FullStackMockup
This full-stack mockup uses Angular with Express to make a mockup of a full-stack web application.
An API route, `/api/photos` serves paginated mockup data.
The client-side requests the photos it needs and stores them.
This means that if the user navigates from page 1 to page 2 and
then back to page 1, no new HTTP request is created on the back navigation.
Other features include:
- Validating API requests so that the server does not crash or gets DOS-d easily
- Pagination
- Responsive design
- Scrollbar jump prevention
- Client-side routing
- Server-side rendering 
- etc.

## Development
### Development server
Run `ng dev:ssr` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module|@ngrx/schematics:{feature|entity}`.

### Build
Run `ng build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Help with Angular CLI
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
