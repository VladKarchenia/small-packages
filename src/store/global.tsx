import { useEffect } from "react"
// import create, { UseBoundStore, StateSelector, EqualityChecker } from "zustand"
// import { useRouter } from "next/router"
// import { devtools } from "zustand/middleware"

// import { Bounds } from "@/utils/bounds"
// import {
//   FlexiblePeriod,
//   PagedRequest,
//   SearchType,
//   StaticFilters,
// } from "@/types/graphql-global-types"
// import { useQueryState } from "@/hooks/useQueryState"
// import { config } from "@/config"

// export enum SearchUserAction {
//   LOAD = "LOAD",
//   IDLE = "IDLE",
//   FILTERS = "FILTERS",
//   MAP_CHANGE = "MAP_CHANGE",
//   PAGINATION = "PAGINATION",
// }

// export enum LayoutView {
//   LIST = "LIST",
//   MAP = "MAP",
// }

// export interface DestinationState {
//   location: string
//   placeId: string
//   bounds?: Bounds
// }

// export interface CalendarState {
//   checkIn: Date
//   checkOut: Date
//   flex: number
// }

// export interface FlexibleState {
//   period: FlexiblePeriod
//   months: string[]
// }

// export interface DatesState {
//   calendar: CalendarState
//   flexible: FlexibleState
// }

// export interface GuestsState {
//   adults: number
//   children: number
//   infants: number
//   pets: number
// }

// export interface PriceFilters {
//   nightly: PriceMinMax
// }

// export type PriceMinMax = {
//   min?: number
//   max?: number
// }

// export type DatepickerType = "calendar" | "flexible"
// export const DEFAULT_DATE_PICKER_TYPE: DatepickerType = "calendar"

// export interface GlobalStoreState {
//   hydrated: boolean

//   destination: DestinationState
//   dates: DatesState
//   guests: GuestsState

//   datepickerType: DatepickerType

//   staticFilters: StaticFilters

//   page: PagedRequest
//   searchType: SearchType

//   price: PriceFilters

//   userAction: SearchUserAction

//   scrollPosition: number
//   view: LayoutView

//   hasOpenedMapView: boolean
//   haveResultsChanged: boolean
// }

// export interface GlobalStoreStateWithActions extends GlobalStoreState {
//   updatePrimaryFilters: (
//     destination?: DestinationState,
//     dates?: DatesState,
//     guests?: GuestsState,
//     datepickerType?: DatepickerType,
//   ) => void

//   updateStaticFilters: (staticFilters: StaticFilters) => void

//   updatePriceFilters: (nightlyPrice: PriceMinMax) => void

//   updateBounds: (bounds: Bounds) => void

//   updatePageParams: (pageParams: PagedRequest, searchType: SearchType) => void

//   setUserAction: (action: SearchUserAction) => void

//   clearDestination: () => void
//   clearPrice: () => void

//   setResultsChanged: (changed: boolean) => void
//   setSearchTerm: (searchTerm: string) => void

//   toggleView: () => void
// }

// export type GlobalStore = UseBoundStore<GlobalStoreStateWithActions>
// export type UseGlobalStore = <U>(
//   selector: StateSelector<GlobalStoreStateWithActions, U>,
//   equalityFn?: EqualityChecker<U>,
// ) => U

// const defaultPageParams = {
//   page: {
//     offset: null,
//     limit: null,
//   },
//   searchType: null,
// }

// const initialState: GlobalStoreState = {
//   hydrated: false,

//   destination: {
//     location: null,
//     placeId: null,
//     bounds: null,
//   },

//   dates: {
//     calendar: {
//       checkIn: null,
//       checkOut: null,
//       flex: null,
//     },

//     flexible: {
//       period: null,
//       months: [],
//     },
//   },

//   guests: {
//     adults: null,
//     infants: null,
//     children: null,
//     pets: null,
//   },

//   price: {
//     nightly: {
//       min: null,
//       max: null,
//     },
//   },

//   datepickerType: null,

//   staticFilters: {
//     infantsAllowed: null,
//     childrenAllowed: null,
//     petsAllowed: null,
//     instantBook: null,
//     freeCancellation: null,
//     stepFreeAccess: null,
//     maxSteps: null,
//     amenities: [],
//     occasions: [],
//     propertyTypes: [],
//   },

//   ...defaultPageParams,

//   userAction: SearchUserAction.LOAD,

//   scrollPosition: 0,
//   view: LayoutView.LIST,

//   haveResultsChanged: false,
//   hasOpenedMapView: false,
// }

// const isDevelopment = config.APP_ENV === "development"
// function initStore(preloadedState: Partial<GlobalStoreState> = {}) {
//   const actions = (set, get) => ({
//     ...initialState,
//     ...preloadedState,

//     updatePrimaryFilters: (destination, dates, guests, datepickerType) => {
//       const hasPlaceId = !!getFilterValue(destination?.placeId, () => get().destination.placeId)

//       set({
//         destination: {
//           location: getFilterValue(destination?.location, () => get().destination.location),
//           placeId: getFilterValue(destination?.placeId, () => get().destination.placeId),
//           bounds:
//             hasPlaceId || destination.bounds === null
//               ? { ne_lat: null, ne_lng: null, sw_lat: null, sw_lng: null }
//               : get().destination.bounds,
//         },

//         dates: {
//           calendar: {
//             checkIn: dates?.calendar?.checkIn,
//             checkOut: dates?.calendar?.checkOut,
//             flex: dates?.calendar?.flex,
//           },

//           flexible: {
//             period: dates?.flexible?.period,
//             months: dates?.flexible?.months || [],
//           },
//         },

//         guests: {
//           adults: getFilterValue(guests?.adults, () => get().guests.adults),
//           children: getFilterValue(guests?.children, () => get().guests.children),
//           infants: getFilterValue(guests?.infants, () => get().guests.infants),
//           pets: getFilterValue(guests?.pets, () => get().guests.pets),
//         },

//         datepickerType,

//         userAction: SearchUserAction.FILTERS,

//         scrollPosition: 0,

//         ...defaultPageParams,
//       })
//     },

//     updateStaticFilters: ({
//       instantBook,
//       freeCancellation,
//       stepFreeAccess,
//       maxSteps,
//       childrenAllowed,
//       infantsAllowed,
//       petsAllowed,
//       amenities,
//       occasions,
//       propertyTypes,
//       minBathrooms,
//       minBedrooms,
//       minBeds,
//     }) => {
//       set({
//         staticFilters: {
//           infantsAllowed: getFilterValue(infantsAllowed, () => get().staticFilters.infantsAllowed),
//           childrenAllowed: getFilterValue(
//             childrenAllowed,
//             () => get().staticFilters.childrenAllowed,
//           ),
//           petsAllowed: getFilterValue(petsAllowed, () => get().staticFilters.petsAllowed),
//           instantBook: getFilterValue(instantBook, () => get().staticFilters.instantBook),
//           freeCancellation: getFilterValue(
//             freeCancellation,
//             () => get().staticFilters.freeCancellation,
//           ),
//           occasions: getFilterValue(occasions, () => get().staticFilters.occasions),
//           propertyTypes: getFilterValue(propertyTypes, () => get().staticFilters.propertyTypes),
//           stepFreeAccess: getFilterValue(stepFreeAccess, () => get().staticFilters.stepFreeAccess),
//           maxSteps: getFilterValue(maxSteps, () => get().staticFilters.maxSteps),
//           amenities: getFilterValue(amenities, () => get().staticFilters.amenities),
//           minBathrooms: getFilterValue(minBathrooms, () => get().staticFilters.minBathrooms),
//           minBedrooms: getFilterValue(minBedrooms, () => get().staticFilters.minBedrooms),
//           minBeds: getFilterValue(minBeds, () => get().staticFilters.minBeds),
//         },

//         userAction: SearchUserAction.FILTERS,

//         scrollPosition: 0,

//         ...defaultPageParams,
//       })
//     },

//     updatePriceFilters: (nightly) => {
//       set({
//         price: {
//           nightly: {
//             min: getFilterValue(nightly.min || null, () => get().price.nightly.min),
//             max: getFilterValue(nightly.max || null, () => get().price.nightly.max),
//           },
//         },

//         userAction: SearchUserAction.FILTERS,

//         scrollPosition: 0,

//         ...defaultPageParams,
//       })
//     },

//     updateBounds: (bounds) => {
//       set({
//         destination: {
//           location: null,
//           placeId: null,
//           bounds,
//         },

//         userAction: SearchUserAction.MAP_CHANGE,

//         scrollPosition: 0,

//         ...defaultPageParams,
//       })
//     },

//     updatePageParams: ({ offset, limit }, searchType) => {
//       set({
//         page: {
//           offset: getFilterValue(offset, () => get().page.offset),
//           limit: getFilterValue(limit, () => get().page.limit),
//         },
//         searchType: getFilterValue(searchType, () => get().searchType),

//         userAction: SearchUserAction.PAGINATION,

//         scrollPosition: 0,
//       })
//     },

//     setUserAction: (action) => {
//       set({ userAction: action })
//     },

//     clearDestination: () => {
//       set({
//         destination: {
//           ...get().destination,
//           location: null,
//           placeId: null,
//         },

//         ...defaultPageParams,
//       })
//     },

//     clearPrice: () => {
//       set({
//         price: {
//           nightly: {
//             min: null,
//             max: null,
//           },
//         },
//       })
//     },

//     setResultsChanged: (changed) => {
//       set({ haveResultsChanged: changed })
//     },

//     setSearchTerm: (searchTerm: string) => {
//       set({
//         destination: { ...get().destination, location: searchTerm },
//       })
//     },

//     toggleView: () => {
//       const isListView = get().view === LayoutView.LIST

//       set({
//         scrollPosition: isListView ? window.scrollY : get().scrollPosition,
//         view: isListView ? LayoutView.MAP : LayoutView.LIST,

//         hasOpenedMapView: true,
//       })
//     },
//   })
//   return isDevelopment
//     ? create<GlobalStoreStateWithActions>(devtools(actions))
//     : create<GlobalStoreStateWithActions>(actions)
// }

// let store: GlobalStore

// export function initializeStore() {
//   let _store = store ?? initStore()

//   // After navigating to a page with an initial Zustand state, merge that state
//   // with the current state in the store, and create a new store
//   if (store) {
//     _store = initStore(store.getState())
//     // Reset the current store
//     store = undefined
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === "undefined") return _store
//   // Create the store once in the client
//   if (!store) store = _store

//   return _store
// }

// export const useStore = initializeStore()

// export function useHydrate() {
//   const { isReady } = useRouter()

//   const hydrated = useStore((state) => state.hydrated)

//   const queryState = useQueryState()

//   useEffect(() => {
//     if (!isReady || hydrated) return

//     useStore.setState({
//       hydrated: true,
//       ...queryState,
//     })
//   }, [hydrated, isReady, queryState])
// }

// export function getFilterValue(newValue, getCurrent) {
//   return typeof newValue !== "undefined" ? newValue : getCurrent()
// }

// export function hasDatesAndLocation({
//   checkIn,
//   checkOut,
//   flexPeriod,
//   flexMonths,
//   placeId,
//   location,
//   ne_lat,
// }: {
//   checkIn: Date
//   checkOut: Date
//   flexPeriod: FlexiblePeriod
//   flexMonths: string[]
//   placeId: string
//   location: string
//   ne_lat: number
// }) {
//   const hasCalendarDates = checkIn && checkOut
//   const isFlexible = flexPeriod && flexMonths
//   const hasLocation = placeId || ne_lat || location
//   // Checks if dates (calendarDates OR flexibleDates) and location (location or mapBounds) are set
//   return (hasCalendarDates || isFlexible) && !!hasLocation
// }
