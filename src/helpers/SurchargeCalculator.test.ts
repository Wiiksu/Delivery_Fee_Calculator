import { describe, it, expect } from "vitest";
import {
  underTenSurcharge,
  distanceSurcharge,
  numberOfItemsSurcharge,
  rushHourSurcharge,
  surchargeCalculator,
} from "./SurchargeCalculator";

// For testing the rushHourSurcharge-function.
const RUSH_HOUR = new Date(2024, 1, 23, 15, 0, 0); // Fri Feb 23 2024 15:00:00 for testing rush hour multiplier
const NOT_RUSH_HOUR = new Date(2024, 1, 23, 14, 0, 0); // Fri Feb 23 2024 14:00:00 for testing on friday in non-rush-hours
const NOT_RUSH_HOUR_DAY = new Date(2024, 1, 24, 17, 0, 0); // Sat Feb 24 2024 17:00:00 for testing in rush hour-hours, but on saturday

// For testing the results of the <UserFormReturnType> that the surchargeCalculator-function returns.
const MOCKDATA_UNDER_TEN = {
  cartValue: 9,
  deliveryDistance: 1000,
  numberOfItems: 4,
  orderTime: NOT_RUSH_HOUR,
};

const MOCKDATA_DELIVERY = {
  cartValue: 10,
  deliveryDistance: 1001,
  numberOfItems: 4,
  orderTime: NOT_RUSH_HOUR,
};

const MOCKDATA_ITEM_NUMBER = {
  cartValue: 10,
  deliveryDistance: 1000,
  numberOfItems: 13,
  orderTime: NOT_RUSH_HOUR,
};

const MOCKDATA_RUSH_HOUR = {
  cartValue: 10,
  deliveryDistance: 1000,
  numberOfItems: 4,
  orderTime: RUSH_HOUR,
};

const MOCKDATA_NOT_RUSH_HOUR = {
  cartValue: 10,
  deliveryDistance: 1000,
  numberOfItems: 4,
  orderTime: NOT_RUSH_HOUR,
};

describe("Calculates surcharge for small orders", () => {
  it("Returns the difference in orders below 10€", () => {
    const result = underTenSurcharge(5.5);
    expect(result).toBeCloseTo(4.5);
  });
  it("Returns 0€ if the order is 10€", () => {
    const result = underTenSurcharge(10);
    expect(result).toBe(0);
  });
  it("Returns 0€ if the order is over 10€", () => {
    const result = underTenSurcharge(11);
    expect(result).toBe(0);
  });
});

describe("Calculates surcharge based on delivery distance", () => {
  it("Returns 2€ if the distance is under 1000m", () => {
    const result = distanceSurcharge(999);
    expect(result).toBe(2);
  });
  it("Returns 2€ if the distance is 1000m", () => {
    const result = distanceSurcharge(1000);
    expect(result).toBe(2);
  });
  it("Returns 3€ if the distance is over 1000m, but under 1500m", () => {
    const result = distanceSurcharge(1001);
    expect(result).toBe(3);
  });
  it("Returns 3€ if the distance is 1500m", () => {
    const result = distanceSurcharge(1500);
    expect(result).toBe(3);
  });
  it("Returns 4€ if the distance is over 1500m, but under 2000m", () => {
    const result = distanceSurcharge(1501);
    expect(result).toBe(4);
  });
  it("Returns maximum 15€ if the surcharge calculation exceeds 15€", () => {
    const result = distanceSurcharge(8000);
    expect(result).toBe(15);
  });
});

describe("Calculates surcharge based on the number of items in cart", () => {
  it("Returns 0€ if the number of items is 4 or less", () => {
    const result = numberOfItemsSurcharge(4);
    expect(result).toBe(0);
  });
  it("Returns 0.5€ if the number of items is 5", () => {
    const result = numberOfItemsSurcharge(5);
    expect(result).toBe(0.5);
  });
  it("Returns 0.5€ for every additional item over 5 up to 12 items", () => {
    const result = numberOfItemsSurcharge(12);
    expect(result).toBe(4);
  });
  it("Returns 0.5€ for every additional item over 5 items and adds bulk surcharge of 1.2€ if the number of items exceeds 12", () => {
    const result = numberOfItemsSurcharge(13);
    expect(result).toBe(5.7);
  });
  it("Returns 0.5€ for every additional item over 5 items and adds bulk surcharge of 1.2€ if the number of items exceeds 12 (14 items in this case)", () => {
    const result = numberOfItemsSurcharge(14);
    expect(result).toBe(6.2);
  });
  it("Returns maximum 15€ if the surcharge calculation exceeds 15€", () => {
    const result = numberOfItemsSurcharge(32);
    expect(result).toBe(15);
  });
});

describe("Calculates the rush hour surcharge (+20% of the total surcharge amount) on fridays between 3 and 7PM", () => {
  it("Returns 20% (1.64€) of the current surcharges (8.2€) during rush hour (FRI 3-7PM)", () => {
    const result = rushHourSurcharge(RUSH_HOUR, 8.2);
    expect(result).toBeCloseTo(1.64);
  });
  it("Returns 0€ if the day is Friday, but it's not rush hour", () => {
    const result = rushHourSurcharge(NOT_RUSH_HOUR, 8.2);
    expect(result).toBe(0);
  });
  it("Returns 0€ if the day is not Friday, but it's between 3 and 7PM", () => {
    const result = rushHourSurcharge(NOT_RUSH_HOUR_DAY, 8.2);
    expect(result).toBe(0);
  });
});

describe("Calculates the total surcharge-details and returns an object with those values", () => {
  it("Returns correct surcharges based on MOCKDATA_UNDER_TEN values", () => {
    const result = surchargeCalculator(MOCKDATA_UNDER_TEN);
    expect(result.cartValueSurcharge).toBe(1);
    expect(result.deliveryDistanceSurcharge).toBe(2);
    expect(result.numberOfItemsSurcharge).toBe(0);
    expect(result.orderTimeSurcharge).toBe(0);
    expect(result.orderTotal).toBe(3);
    expect(result.freeOrder).toBeFalsy();
  });
  it("Returns correct surcharges based on MOCKDATA_DELIVERY values", () => {
    const result = surchargeCalculator(MOCKDATA_DELIVERY);
    expect(result.cartValueSurcharge).toBe(0);
    expect(result.deliveryDistanceSurcharge).toBe(3);
    expect(result.numberOfItemsSurcharge).toBe(0);
    expect(result.orderTimeSurcharge).toBe(0);
    expect(result.orderTotal).toBe(3);
    expect(result.freeOrder).toBeFalsy();
  });
  it("Returns correct surcharges based on MOCKDATA_ITEM_NUMBER values", () => {
    const result = surchargeCalculator(MOCKDATA_ITEM_NUMBER);
    expect(result.cartValueSurcharge).toBe(0);
    expect(result.deliveryDistanceSurcharge).toBe(2);
    expect(result.numberOfItemsSurcharge).toBe(5.7);
    expect(result.orderTimeSurcharge).toBe(0);
    expect(result.orderTotal).toBeCloseTo(7.7);
    expect(result.freeOrder).toBeFalsy();
  });
  it("Returns correct surcharges based on MOCKDATA_RUSH_HOUR values", () => {
    const result = surchargeCalculator(MOCKDATA_RUSH_HOUR);
    expect(result.cartValueSurcharge).toBe(0);
    expect(result.deliveryDistanceSurcharge).toBe(2);
    expect(result.numberOfItemsSurcharge).toBe(0);
    expect(result.orderTimeSurcharge).toBeCloseTo(0.4);
    expect(result.orderTotal).toBeCloseTo(2.4);
    expect(result.freeOrder).toBeFalsy();
  });
  it("Returns correct surcharges based on MOCKDATA_NOT_RUSH_HOUR values", () => {
    const result = surchargeCalculator(MOCKDATA_NOT_RUSH_HOUR);
    expect(result.cartValueSurcharge).toBe(0);
    expect(result.deliveryDistanceSurcharge).toBe(2);
    expect(result.numberOfItemsSurcharge).toBe(0);
    expect(result.orderTimeSurcharge).toBe(0);
    expect(result.orderTotal).toBeCloseTo(2);
    expect(result.freeOrder).toBeFalsy();
  });
});
