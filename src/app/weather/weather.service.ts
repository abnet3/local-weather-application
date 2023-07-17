import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { flatMap, map, switchMap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../interfaces'
import { PostalCodeService } from '../postal-code/postal-code.service'

interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}

export interface IWeatherService {
  readonly currentWeather$: BehaviorSubject<ICurrentWeather>
  getCurrentWeather(search: string, country?: string): Observable<ICurrentWeather>
  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather>
  updateCurrentWeather(search: string, country?: string): void
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })
  constructor(
    private httpClient: HttpClient,
    private postalCodeService: PostalCodeService
  ) {}

  // getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
  //   const uriParams = new HttpParams()
  //     .set('q', `${city},${country}`)
  //     .set('appid', environment.appId)

  //   return this.httpClient
  //     .get<ICurrentWeatherData>(
  //       `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
  //       { params: uriParams }
  //     )
  //     .pipe(map((data) => this.transformToICurrentWeather(data)))
  // }

  // getCurrentWeather(
  //   search: string | number,
  //   country: string
  // ): Observable<ICurrentWeather> {
  //   let uriParams = new HttpParams()
  //   if (typeof search === 'string') {
  //     uriParams = uriParams.set('q', country ? `${search}, ${country}` : search)
  //   } else {
  //     uriParams = uriParams.set('zip', 'search')
  //   }
  //   uriParams = uriParams.set('appid', environment.appId)
  //   return this.getCurrentWeatherHelper(uriParams)
  // }

  getCurrentWeather(searchText: string, country: string): Observable<ICurrentWeather> {
    return this.postalCodeService.resolvePostalCode(searchText).pipe(
      //chaining api calls
      switchMap((postalCode) => {
        console.log(postalCode)
        if (postalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          } as GeolocationCoordinates)
        } else {
          const uriParams = new HttpParams().set(
            'q',
            country ? `${searchText},${country}` : searchText
          )
          return this.getCurrentWeatherHelper(uriParams)
        }
      })
    )
  }

  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString())
    return this.getCurrentWeatherHelper(uriParams)
  }

  private getCurrentWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
    // SOLID Prinicipel and Open/Close Prinicple
    uriParams = uriParams.set('appid', environment.appId)
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }

  updateCurrentWeather(search: string, country?: string): void {
    if (country) {
      this.getCurrentWeather(search, country).subscribe((weather) => {
        console.log(weather)
        this.currentWeather$.next(weather)
      })
    }
  }
}
