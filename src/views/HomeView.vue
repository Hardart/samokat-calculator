<script setup lang="ts">
import HdInput from '@/components/HdInput.vue'
import { useLocalStorage } from '@vueuse/core'
import {
  Checkbox,
  InputNumber,
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
} from 'primevue'
import { computed, ref } from 'vue'

interface Period {
  hours: number
  orders: number
  profit: number
}

interface LocalDataBase {
  period: number[]
  profitForPeriod: number
  periods: Record<string, Period>[][]
  totalForAll: number
}

const ORDER = 40
const MORNING = 30
const EVENING = 5
const NIGHT = 70

const HOUR = 130
const WEATHER = 10
const LAST_WEEK_HOURS = 10

const DAY_FEED = 15
const FEED_DAYS = [0, 1]

const today = new Date().getDay()

const hours = ref(0)
const orders = ref(0)
const morningOrders = ref(0)
const eveningOrders = ref(0)
const nightOrders = ref(0)
const isWeather = ref(false)
const isLastWeekHours = ref(false)

const calcOrderPrice = computed(() => {
  let price = ORDER
  if (isWeather.value) price += WEATHER
  return price
})
const isFeedDaysIncludeToday = computed(() => FEED_DAYS.includes(today))

const hourPrice = computed(() => {
  let price = HOUR
  if (isLastWeekHours.value) price += LAST_WEEK_HOURS
  if (isFeedDaysIncludeToday.value) price += DAY_FEED
  return price
})

const calcOrders = computed(() => {
  let orderPrice = orders.value * calcOrderPrice.value

  if (orders.value >= morningOrders.value) {
    orderPrice += morningOrders.value * MORNING
  } else if (morningOrders.value) {
    orderPrice += orders.value * MORNING
  }

  if (orders.value >= eveningOrders.value) {
    orderPrice += eveningOrders.value * EVENING
  } else if (eveningOrders.value) {
    orderPrice += orders.value * EVENING
  }

  if (orders.value >= nightOrders.value) {
    orderPrice += nightOrders.value * NIGHT
  } else if (nightOrders.value) {
    orderPrice += orders.value * NIGHT
  }

  return orderPrice
})

const profit = computed(() => hours.value * hourPrice.value + calcOrders.value)
const todayDate = Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
}).format(new Date())

const rating = computed(() => {
  const value = orders.value / hours.value
  return Number.isNaN(value) || !Number.isFinite(value) || !value
    ? 0
    : Number(value).toFixed(2)
})

const weekday = Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
}).format(new Date())

const localDB = useLocalStorage('db', {} as LocalDataBase)
if (localDB.value.period.includes(7)) {
  reset()
}
const save = () => {
  if (!localDB.value.periods) localDB.value.periods = []
  if (!localDB.value.period) localDB.value.period = []

  const day = new Date().getDay() === 0 ? 7 : new Date().getDay()
  if (!localDB.value.period.includes(day)) localDB.value.period.push(day)

  const lastPerod = localDB.value.period.length - 1
  if (!localDB.value.periods[lastPerod]) localDB.value.periods[lastPerod] = []

  const period: Period = {
    hours: hours.value,
    orders: orders.value,
    profit: profit.value,
  }

  const localPeriod = localDB.value.periods[lastPerod]

  if (localPeriod.some((item) => todayDate in item)) return
  localPeriod.push({ [todayDate]: period })
  localDB.value.profitForPeriod += profit.value
  localDB.value.totalForAll += orders.value
}

const isSaved = computed(
  () =>
    localDB.value.periods &&
    localDB.value.periods.some((period) =>
      period.some((item) => todayDate in item)
    )
)
function reset() {
  localDB.value.profitForPeriod = 0
  localDB.value.totalForAll = 0
  localDB.value.periods = []
  localDB.value.period = []
}
</script>

<template>
  <main class="calculator">
    <div class="date">
      <h3>{{ todayDate }}</h3>
    </div>
    <div class="rating">
      <h3>Нагрузка: {{ rating }}</h3>
    </div>
    <div class="input-group">
      <InputNumber class="hidden" />
      <HdInput v-model="hours" label="Количество часов" id="hours" />
    </div>
    <div class="input-group">
      <HdInput v-model.number="orders" label="Количество заказов" id="orders" />
    </div>

    <div class="card">
      <Accordion value="0">
        <AccordionPanel value="1">
          <AccordionHeader>Надбавки</AccordionHeader>
          <AccordionContent>
            <div class="input-group">
              <HdInput
                v-model="morningOrders"
                label="Утренние заказы (7:00-9:00)"
                id="morning"
              />
            </div>
            <div class="input-group">
              <HdInput
                v-model="eveningOrders"
                label="Вечерние заказы (18:00-23:00)"
                id="eveningOrders"
              />
            </div>
            <div class="input-group">
              <HdInput
                v-model="nightOrders"
                label="Ночные заказы (23:00-01:00)"
                id="nightOrders"
              />
            </div>
            <hr />
            <div class="feeds input-group input-group--horisontal gap-l">
              <div class="input-group input-group--horisontal gap-s">
                <Checkbox
                  v-model="isWeather"
                  inputId="weather"
                  name="weather"
                  binary
                />
                <label for="weather">Погода</label>
              </div>
              <div class="input-group input-group--horisontal gap-s">
                <Checkbox
                  v-model="isLastWeekHours"
                  inputId="last-week-hours"
                  name="last-week-hours"
                  binary
                />
                <label for="last-week-hours">30ч</label>
              </div>
            </div>
            <p v-if="isFeedDaysIncludeToday" class="feed-day">
              Прибавка за {{ weekday }}:
              <span class="feed-day__price">{{ DAY_FEED }}₽</span> к часу
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <div class="sum">
      <p class="sum__title">Заработал сегодня</p>
      <h3 class="sum__value">{{ profit }} ₽</h3>
      <p class="sum__title">Заработал за неделю</p>
      <h3 class="sum__value">{{ localDB.profitForPeriod }} ₽</h3>
      <Button
        label="Сохранить"
        class="save-btn"
        fluid
        @click="save"
        :disabled="isSaved || profit === 0"
      />
      <!-- <Button label="Обнулить" fluid @click="reset" /> -->
    </div>
  </main>
</template>

<style src="./styles.css" />
