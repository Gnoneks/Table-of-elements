import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DeviceCheckerService } from './services/device-checker.service';
import { IsBrowserService } from './services/is-browser.service';

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
