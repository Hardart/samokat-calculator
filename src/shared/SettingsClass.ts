export class GlobalSettongs {
  id = null
  orderCost = 35
  hourCost = 120
  badWeatherSurcharge = 10
  morningSurcharge = 30
  eveningSurcharge = 30
  nightSurcharge = 70
  extraDaySurcharge = 15
  isExtraDay = false
  isLastWeekHours = false
  isWeatherSurcharge = false
  extraDays = ['понедельник', 'воскресенье']
  transportType = 'scooter'
  isRentingTransport = false
}

export class Settings extends GlobalSettongs {
  // Статическое свойство для хранения единственного экземпляра
  private static instance: Settings

  // Приватный конструктор, чтобы экземпляр нельзя было создать извне
  private constructor() {
    super()
  }

  // Статический метод для получения экземпляра класса
  public static getInstance(): Settings {
    if (!Settings.instance) Settings.instance = new Settings()
    return Settings.instance
  }
}

export default Settings.getInstance()
