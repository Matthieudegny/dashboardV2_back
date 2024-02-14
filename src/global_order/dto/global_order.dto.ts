export class GlobalOrderDto {
  go_id: number;
  go_user_id: number;
  go_openDate: Date;
  go_closeDate: Date;
  go_asset: string;
  go_quantity: number;
  go_entryPrice: number;
  go_exitPrice: number;
  go_percentageEngaged: number;
  go_percentageStopLoss: number;
  go_status: boolean;
  go_result: number;
  go_comment: string;
  go_direction: string;
}
