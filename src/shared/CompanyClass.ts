type Rent = {
  isActive: boolean
  freeHours: number
  discountHours: number
  discountCost: number
  cost: number
}

type lastWeekBonus = {
  hours: number
  cost: number
}
// Модель компании
export class Company {
  id: string | null = null
  name = ''
  hasRent = false
  hasLastWeekBonus = true

  rent: Rent = {
    isActive: false,
    freeHours: 0,
    discountHours: 0,
    discountCost: 0,
    cost: 0,
  }

  lastWeekBonus: lastWeekBonus = {
    hours: 0,
    cost: 0,
  }

  // Статическое свойство для хранения единственного экземпляра
  private static instance: Company

  // Приватный конструктор, чтобы экземпляр нельзя было создать извне
  private constructor() {}

  // Статический метод для получения экземпляра класса
  public static getInstance(): Company {
    if (!Company.instance) Company.instance = new Company()
    return Company.instance
  }
}

export default Company.getInstance()
