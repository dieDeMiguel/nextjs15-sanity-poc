import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes';
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';

export default async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
  if (!sale.isActive) {
    return null;
  }
  return <div />;
}
