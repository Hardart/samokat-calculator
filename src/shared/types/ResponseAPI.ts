import type { Company } from '../schemas/company-schema'
import type { Courier } from '../schemas/courier-schema'
import type { GlobalSettings } from '../schemas/settings-schema'

export interface CustomFetchOptions {
  url: string
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: object
  query?: object
}

export type CustomResponse<T> =
  | {
      status: 'success'
      data: T
    }
  | {
      status: 'fail' | 'error'
      message: string
      errors: object[]
    }

export interface CompanyListItem {
  name: string
  id: string
}

export declare namespace ResponseApi {
  namespace Settings {
    type Global = GlobalSettings
  }

  namespace CourierData {
    type Single = Courier
    type Logout = boolean
  }

  namespace CompanyData {
    type List = Company[]
    type Single = Company
  }
}
