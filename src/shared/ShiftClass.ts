import Settings from './SettingsClass'
import Company from './CompanyClass'

// Модель смены
export class Shift {
  id: string | null = null
  settings = Settings
  company = Company
  orders = 0
  morningOrders = 0
  eveningOrders = 0
  nightOrders = 0
  hours = 0
  tips = 0
  totalEarnings = 0
  date = new Date()

  // Статическое свойство для хранения единственного экземпляра
  private static instance: Shift

  // Приватный конструктор, чтобы экземпляр нельзя было создать извне
  private constructor() {}

  // Статический метод для получения экземпляра класса
  public static getInstance(): Shift {
    if (!Shift.instance) Shift.instance = new Shift()
    return Shift.instance
  }
}

export default Shift.getInstance()
