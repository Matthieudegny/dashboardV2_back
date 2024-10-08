import { Sub_Order_Add_Dto } from 'src/sub_order/sub_order_add/dto/suborder_Add.dto';
import { Suborder_Reduce_Dto } from 'src/sub_order/sub_order_reduce/dto/suborder_Reduce.dto';

export function getDate(
  item: Suborder_Reduce_Dto | Sub_Order_Add_Dto,
): Date | null {
  if ('subOrder_reduce_closeDate' in item) {
    return item.subOrder_reduce_closeDate; // Return the close date for Suborder_Reduce_Dto
  } else if ('subOrder_add_openDate' in item) {
    return item.subOrder_add_openDate; // Return the open date for Sub_Order_Add_Dto
  }
  return null; // Return null if neither property exists
}
