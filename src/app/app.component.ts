import { Component, OnInit, Compiler, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';

type ModuleWithRoot = Type<any> & { root: Type<any> };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  data = [{
    id: 1,
    name: 'Hello',
    description: 'Hello world! You are very nice...',
    date: new Date('01/01/2019').toDateString()
  }, {
    id: 3,
    name: 'Bye',
    description: 'Hello world! You are very nice... aijfhidashf iaj filsaj jas; jdasjd duhas',
    date: new Date('01/01/2019').toDateString()
  }, {
    id: 2,
    name: 'Bye',
    description: 'Hello world! You are very nice...',
    date: new Date('01/01/2019').toDateString()
  }];

  public module;

  constructor(
    public compiler: Compiler,
    public injector: Injector
  ) { }

  ngOnInit() {
    for (let i = 0; i < 500; i++) {
      this.data.push({
        id: this.data.length + 1,
        name: 'Hi!',
        description: 'Hi nigga!!',
        date: new Date().toDateString()
      });
    }

    // const sharedWorker = new Worker(`./my-worker.worker`, { type: `module` });
    // const obj = { tets: "FFSD", tt: 'dddd'};
    // sharedWorker.onmessage = ({ data }) => {
    //   console.log(obj);
    //   console.log(`page got message: ${data}`);
    // };
    // sharedWorker.postMessage(obj);
  }

  public onClick(): void {
    this.data = [...this.data, {
      id: this.data.length + 1,
      name: 'Hi!',
      description: 'Hi nigga!!',
      date: new Date().toDateString()
    }];
  }
}
