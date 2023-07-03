import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { WeatherService } from './weather/weather.service'

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [WeatherService],
      imports: [HttpClientTestingModule],
    })
  )

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  // it(`should have as title 'local-weather-application'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   const app = fixture.componentInstance
  //   expect(app.title).toEqual('local-weather-application')
  // })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain('LocalCast Weather')
  })
})
