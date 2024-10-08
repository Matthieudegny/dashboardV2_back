import { Sub_Order_Add_Dto } from 'src/sub_order/sub_order_add/dto/suborder_Add.dto';
import { Suborder_Reduce_Dto } from 'src/sub_order/sub_order_reduce/dto/suborder_Reduce.dto';

export function isSuborderAdd(
  subOrder: Suborder_Reduce_Dto | Sub_Order_Add_Dto,
): subOrder is Sub_Order_Add_Dto {
  return (subOrder as Sub_Order_Add_Dto).subOrder_add_id !== undefined; // Check for a property unique to Sub_Order_Add_Dto
}
