import { ResultProps } from "../../helpers/types";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";

export default function Results({ orderResults }: ResultProps) {
  const FREE_ORDER = orderResults?.freeOrder;
  const cartValueSurcharge = orderResults?.cartValueSurcharge;
  const deliveryDistanceSurcharge = orderResults?.deliveryDistanceSurcharge;
  const numberOfItemsSurcharge =
    orderResults?.numberOfItemsSurcharge.toFixed(2);
  const orderTimeSurcharge = orderResults?.orderTimeSurcharge.toFixed(2);
  const totalSurcharge = orderResults?.orderTotal;

  return (
    <section className="w-80 rounded bg-white px-6 pt-3 shadow-lg h-fit mt-3 md:mt-0">
      <div className="flex items-center justify-center pt-4 pb-4">
        <LuPackageCheck size={120} color="#a855f7" />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <h4 className="font-semibold">Delivery Business Inc.</h4>
        <p className="text-xs text-center">
          123 Address St. Addressville, Addressland 123456
        </p>
      </div>
      <div className="flex flex-col gap-3 border-b py-6 text-xs">
        <p className="flex justify-between">
          <span className="text-black opacity-45">Receipt Number:</span>
          <span>#12345</span>
        </p>
        <p className="flex justify-between">
          <span className="text-black opacity-45">Order Type:</span>
          <span>Delivery</span>
        </p>
        <p className="flex justify-between">
          <span className="text-black opacity-45">Customer:</span>
          <span>Anonymous</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="flex">
              <th className="w-full py-2">Delivery Fee Surcharges</th>
              <th className="min-w-[44px] py-2">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex items-center">
              <td className="flex-1 py-1">Cart Value</td>
              <td
                className="min-w-[44px] py-1"
                data-testid="cartValueSurcharge"
              >
                {FREE_ORDER ? 0 : cartValueSurcharge}€
              </td>
            </tr>
            <tr className="flex items-center">
              <td className="flex-1 py-1">Delivery Distance</td>
              <td
                className="min-w-[44px] py-1"
                data-testid="deliveryDistanceSurcharge"
              >
                {FREE_ORDER ? 0 : deliveryDistanceSurcharge}€
              </td>
            </tr>
            <tr className="flex items-center">
              <td className="flex-1 py-1">Item Amount</td>
              <td
                className="min-w-[44px] py-1"
                data-testid="numberOfItemsSurcharge"
              >
                {FREE_ORDER ? 0 : numberOfItemsSurcharge}€
              </td>
            </tr>
            <tr className="flex items-center">
              <td className="flex-1 py-1">Rush Hour</td>
              <td
                className="min-w-[44px] py-1"
                data-testid="orderTimeSurcharge"
              >
                {FREE_ORDER ? 0 : orderTimeSurcharge}€
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full text-left">
          <thead>
            <tr className="flex items-center">
              <th className="w-full py-2">Order Total</th>
              <th className="min-w-[44px] py-2">Sum</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex items-center">
              <td className="flex-1 py-1">Sum of Surcharges</td>
              <td className="min-w-[44px]" data-testid="totalSurcharge">
                {FREE_ORDER ? 0 : totalSurcharge?.toFixed(2)}€
              </td>
            </tr>
            {FREE_ORDER ? (
              <tr className="flex py-1 items-center">
                <td className="flex-1">Details</td>
                <td
                  className="min-w-[44px] text-purple-400 font-semibold"
                  data-testid="freeDelivery"
                >
                  FREE ORDER!
                </td>
              </tr>
            ) : null}
            {totalSurcharge && totalSurcharge >= 15 ? (
              <tr className="flex py-1 items-center">
                <td className="flex-1">Details</td>
                <td
                  className="min-w-[44px] text-purple-400 font-semibold"
                  data-testid="maximumSurcharge"
                >
                  MAXIMUM-SURCHARGE!
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <hr className=" border-b border border-solid" />
        <div className="py-4 px-12 items-start flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <MdEmail fill="#a855f7" size={15} />
            info@deliverybusiness.com
          </p>
          <p className="flex items-center gap-2">
            <MdLocalPhone fill="#a855f7" size={15} />
            +358-XXX-XXXX
          </p>
        </div>
      </div>
    </section>
  );
}
