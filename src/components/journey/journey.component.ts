import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent {
  private dataService = inject(DataService);
  journeyData = this.dataService.getJourneyData();
}
