import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    TestComponent
  ]
})
export class TestModule {
  public static root = TestComponent;
}
