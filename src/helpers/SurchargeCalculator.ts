import { UserFormReturnType, UserFormType } from "./types";

//Free delivery variable
const FREE_DELIVERY_THRESHOLD = 200;

// Small order variable
const SMALL_ORDER_THRESHOLD = 10;

// Delivery distance surcharge variables
const BASE_DELIVERY_FEE = 2;
const BASE_DISTANCE = 1000;
const ADDITIONAL_DISTANCE = 500;
const ADDITIONAL_DISTANCE_SURCHARGE = 1;

// Item number surcharge variables
const ITEM_NUMBER_THRESHOLD = 5;
const ITEM_SURCHARGE = 0.5;
const BULK_THRESHOLD = 12;
const BULK_SURCHARGE = 1.2;

// Rush hour variables
const RUSH_DAY = 5;
const RUSH_HOUR_START = 15;
const RUSH_HOUR_END = 19;
const RUSH_HOUR_MULTIPLIER = 1.2;

// Additional variables
const MAX_SURCHARGE = 15;

/**
 * If the cart value is less than 10€, a small order surcharge is added to the
 * delivery price. The surcharge is the difference between the cart value and
 * 10€.
 * For example if the cart value is 8.90€, the surcharge will be 1.10€.
 * @param cartValue Value of the shopping cart in euros.
 * @returns the small order surcharge if the carts value doesnt exceed 10€
 */
export const underTenSurcharge = (cartValue: number) => {
  return Math.max(SMALL_ORDER_THRESHOLD - cartValue, 0);
};

/**
 * A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier * * needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
 * Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
 * @param distanceValue Value of the delivery distance in meters.
 * @returns the delivery distance surcharge
 */
export const distanceSurcharge = (deliveryDistance: number) => {
  if (deliveryDistance <= BASE_DISTANCE) {
    return BASE_DELIVERY_FEE;
  } else {
    deliveryDistance -= BASE_DISTANCE;
    const extraDistance =
      Math.ceil(deliveryDistance / ADDITIONAL_DISTANCE) * ADDITIONAL_DISTANCE;
    const distanceSurchargeMultiplier = extraDistance / ADDITIONAL_DISTANCE;
    const totalDistanceSurcharge =
      ADDITIONAL_DISTANCE_SURCHARGE * distanceSurchargeMultiplier +
      BASE_DELIVERY_FEE;
    return Math.min(totalDistanceSurcharge, MAX_SURCHARGE);
  }
};

/**
 * If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
 * Example 1: If the number of items is 4, no extra surcharge
 * Example 2: If the number of items is 5, 50 cents surcharge is added
 * Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
 * Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
 * Example 5: If the number of items is 14, 6,20€ surcharge is added ((10 * 50 cents) + 1,20€)
 * @param itemAmount Number of items in the cart.
 * @returns The surcharge based on the amount of items and the possible bulk-surcharge in euros.
 */
export const numberOfItemsSurcharge = (numberOfItems: number) => {
  if (numberOfItems < ITEM_NUMBER_THRESHOLD) {
    return 0;
  } else if (
    numberOfItems >= ITEM_NUMBER_THRESHOLD &&
    numberOfItems <= BULK_THRESHOLD
  ) {
    return (numberOfItems - (ITEM_NUMBER_THRESHOLD - 1)) * ITEM_SURCHARGE;
  } else {
    const totalNumberOfItemsSurcharge =
      (numberOfItems - (ITEM_NUMBER_THRESHOLD - 1)) * ITEM_SURCHARGE +
      BULK_SURCHARGE;
    return Math.min(totalNumberOfItemsSurcharge, MAX_SURCHARGE);
  }
};

/**
 * During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more
 * than the max (15€). Considering timezone, for simplicity, use UTC as a timezone in backend solutions (so Friday rush is 3 - 7 PM UTC). In frontend solutions, use
 * the timezone of the browser (so Friday rush is 3 - 7 PM in the timezone of the browser).
 * @param orderTime Date/Time when the order is being placed.
 * @param current Sum of possible current surcharges.
 * @returns 0 or conditionally sum of possible current surcharges with the rush hour multiplier.
 */
export const rushHourSurcharge = (
  orderTime: Date,
  currentSurchargeValue: number
) => {
  if (
    orderTime.getDay() === RUSH_DAY &&
    orderTime.getHours() >= RUSH_HOUR_START &&
    orderTime.getHours() < RUSH_HOUR_END
  ) {
    const rushSurcharge = currentSurchargeValue * (RUSH_HOUR_MULTIPLIER - 1);
    return rushSurcharge;
  }
  return 0;
};

/**
 * Calculates smallOrderSurcharge, deliverySurcharge, itemsSurcharge and rushSurcharge based on the values of the formData-param.
 * @param formData that is of type <UserFormType>
 * @returns orderSurchargeDetails-object that is of type <UserFormReturnType>, contains the order surcharge-details.
 */
export function surchargeCalculator(formData: UserFormType) {
  const smallOrderSurcharge = underTenSurcharge(formData.cartValue);
  const deliverySurcharge = distanceSurcharge(formData.deliveryDistance);
  const itemsSurcharge = numberOfItemsSurcharge(formData.numberOfItems);
  const sumOfSurcharges =
    smallOrderSurcharge + deliverySurcharge + itemsSurcharge;
  const rushSurcharge = rushHourSurcharge(
    new Date(formData.orderTime),
    sumOfSurcharges
  );
  const totalSurchargeAmount = sumOfSurcharges + rushSurcharge;

  const orderSurchargeDetails: UserFormReturnType = {
    cartValueSurcharge: smallOrderSurcharge,
    deliveryDistanceSurcharge: deliverySurcharge,
    numberOfItemsSurcharge: itemsSurcharge,
    orderTimeSurcharge: rushSurcharge,
    orderTotal: totalSurchargeAmount,
    freeOrder: false,
  };

  if (totalSurchargeAmount > MAX_SURCHARGE) {
    orderSurchargeDetails.orderTotal = MAX_SURCHARGE;
  }

  if (formData.cartValue >= FREE_DELIVERY_THRESHOLD) {
    // Checks if user is eligible for free delivery
    orderSurchargeDetails.freeOrder = true;
    orderSurchargeDetails.orderTotal = 0;
    return orderSurchargeDetails;
  }
  return orderSurchargeDetails;
}
