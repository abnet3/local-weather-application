import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, filter, tap } from 'rxjs'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent {
  search = new FormControl('', [Validators.required, Validators.minLength(2)])

  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        debounceTime(1000), //@ts-ignore
        filter(() => !this.search.invalid),
        tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe()
  }

  // ngOnInit() {
  //   this.search.valueChanges
  //     .pipe(debounceTime(1000))
  //     .subscribe((searchValue: string | null) => {
  //       if (!this.search.invalid) {
  //         if (searchValue) {
  //           const userInput = searchValue.split(',').map((s) => s.trim())
  //           // this.weatherService
  //           //   .getCurrentWeather(
  //           //     userInput[0], //@ts-ignore
  //           //     userInput.length > 1 ? userInput[1] : undefined
  //           //   )
  //           //   .subscribe((data) => console.log(data))

  //           console.log(userInput[0], userInput.length > 1 ? userInput[1] : undefined)

  //           if (userInput.length === 1) {
  //             this.weatherService.updateCurrentWeather(userInput[0])
  //           } else {
  //             this.weatherService.updateCurrentWeather(userInput[0], userInput[1])
  //           }
  //         }
  //       }
  //     })
  // }

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }
}
