import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DeviceCheckerService } from './shared/device-checker.service';
import { IsBrowserService } from './shared/is-browser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _deviceCheckerService: DeviceCheckerService,
    private readonly _isBrowserService: IsBrowserService
  ) {}

  ngOnInit() {
    if (this._isBrowserService.isBrowser) {
      this._deviceCheckerService.checkDevice();
    }
  }
}
