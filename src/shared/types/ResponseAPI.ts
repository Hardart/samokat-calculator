import type { Company } from '../schemas/company-schema'
import type { Courier } from '../schemas/courier-schema'
import type { Settings } from '../schemas/settings-schema'
import type { ZShift } from '../schemas/shift-schema'
import type { Shift } from '../ShiftClass'

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
    type Global = Settings
  }

  namespace CourierData {
    type Single = Courier
    type Logout = boolean
  }

  namespace CompanyData {
    type List = Company[]
    type Single = Company
  }

  namespace ShiftData {
    type List = ZShift[]
    type Single = ZShift
  }
}
