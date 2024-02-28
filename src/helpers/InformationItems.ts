import { ItemsType } from "./types";

// List of items for the information-component mapping
export const items: ItemsType[] = [
  {
    title: "About this app",
    subinformation: [
      {
        title: "Cart Value",
        info: "If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.",
      },
      {
        title: "Delivery Distance",
        info: "A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 2€.",
      },
      {
        title: "Number of items",
        info: "If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra 'bulk' fee applies for more than 12 items of 1,20€",
      },
      {
        title: "Delivery Time",
        info: "During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x.",
      },
      {
        title: "Additional rules",
        info: "The delivery fee can never be more than 15€, including possible surcharges. The delivery is free (0€) when the cart value is equal or more than 200€.",
      },
    ],
  },
];
