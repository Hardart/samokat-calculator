<script setup lang="ts">
import {
  Checkbox,
  InputNumber,
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primevue'
import { computed, ref } from 'vue'
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

const orderPrice = computed(() => {
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
  let price =
    orders.value - morningOrders.value - eveningOrders.value - nightOrders.value

  return price * orderPrice.value
})

const calcMorningOrders = computed(
  () => morningOrders.value * (orderPrice.value + MORNING) + calcOrders.value
)

const calcEveningOrders = computed(
  () =>
    eveningOrders.value * (orderPrice.value + EVENING) + calcMorningOrders.value
)
const calcNightOrders = computed(
  () => nightOrders.value * (orderPrice.value + NIGHT) + calcEveningOrders.value
)

const sum = computed(
  () => hours.value * hourPrice.value + calcNightOrders.value
)
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
      <label for="hours">Количество часов</label>
      <InputNumber
        input-id="hours"
        v-model="hours"
        showButtons
        buttonLayout="horizontal"
        :min="0"
        :max="99"
      >
        <template #incrementicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementicon>
          <span class="pi pi-minus" />
        </template>
      </InputNumber>
    </div>
    <div class="input-group">
      <label for="hours">Количество заказов</label>
      <InputNumber
        input-id="orders"
        v-model="orders"
        showButtons
        buttonLayout="horizontal"
        :min="0"
        :max="99"
      >
        <template #incrementicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementicon>
          <span class="pi pi-minus" />
        </template>
      </InputNumber>
    </div>

    <div class="card">
      <Accordion value="0">
        <AccordionPanel value="1">
          <AccordionHeader>Надбавки</AccordionHeader>
          <AccordionContent>
            <div class="input-group">
              <label for="morning">Утренние заказы (7:00-9:00)</label>
              <InputNumber
                input-id="morning"
                v-model="morningOrders"
                showButtons
                buttonLayout="horizontal"
                :min="0"
                :max="99"
              >
                <template #incrementicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
            <div class="input-group">
              <label for="evening">Вечерние заказы (18:00-23:00)</label>
              <InputNumber
                input-id="evening"
                v-model="eveningOrders"
                showButtons
                buttonLayout="horizontal"
                :min="0"
                :max="99"
              >
                <template #incrementicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
            <div class="input-group">
              <label for="night">Ночные заказы (23:00-01:00)</label>
              <InputNumber
                input-id="night"
                v-model="nightOrders"
                showButtons
                buttonLayout="horizontal"
                :min="0"
                :max="99"
              >
                <template #incrementicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
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
      <h3 class="sum__value">{{ sum }} ₽</h3>
    </div>
  </main>
</template>

<style src="./styles.css" />
