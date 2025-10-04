import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface App {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockComponent {
  apps = input.required<App[]>();
  openWindowsMap = input.required<Record<string, boolean>>();
  open = output<string>();

  onOpen(appId: string): void {
    this.open.emit(appId);
  }
}
