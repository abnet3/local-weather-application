export interface ICurrentWeatherData {
  weather: [
    // we can create it as a stand alone interface too
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
