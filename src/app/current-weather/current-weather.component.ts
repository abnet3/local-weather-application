import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SubSink } from 'subsink'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent {
  // current!: ICurrentWeather

  current$: Observable<ICurrentWeather>

  // private subscriptions = new SubSink()

  constructor(private weatherService: WeatherService) {
    this.current$ = this.weatherService.currentWeather$
  }

  // ngOnInit(): void {
  //   // this.weatherService.getCurrentWeather('Bethesda', 'US').subscribe((data) => {
  //   //   console.log(data)
  //   //   this.current = data
  //   // })

  //   this.subscriptions.add(
  //     this.weatherService.currentWeather$.subscribe((data) => {
  //       console.log(data)
  //       this.current = data
  //     })
  //   )
  // }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe()
  // }
}
