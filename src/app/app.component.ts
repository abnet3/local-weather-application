import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from './interfaces'
import { WeatherService } from './weather/weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  current!: ICurrentWeather
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getCurrentWeather('Bethesda', 'US').subscribe((data) => {
      console.log(data)
      this.current = data
    })
  }
}
