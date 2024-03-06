export interface IBillType {
  accountNo: number;
  amount: number;
  accountList: IAccountType[];
  balance?: string;
  paymentType: string;
  cardNo: number;
  fee: string;
  recipient: string;
  mobile: number;
  confirmation: number;
  userLogo: string;
  tickImage: string;
  bankLogo: string;
  enrolledAs?: string;
  dueDate?: string;
  zelleImage?: string;
  subUserLogo?: string;
  dropDownDetails: any[];
}
export interface IAccountType {
  accountType: string;
  balance: string;
}

export interface ILiteral {
  amountTitle: string;
  inputPlaceHolder: string;
  amountSubTitle: string;
  due: string;
  account: string;
  viewStatement: string;
  selectionMethod: string;
  amountPayButton: string;
  payButton: string;
  backButton: string;

  amount: string;
  placeholder: string;
  withdrawFrom: string;
  choose: string;
  arrivesIn: string;
  selected: string;
  arrivesMinutes: string;
  deliveryBy: string;
  reason: string;
  memo: string;
  recurringPayment: string;
  modalRecipient: string;
  enrolledAs: string;
  continue: string;
  btnCancel: string;
  btnContinue: string;

  verify: string;
  securityCode: string;
  enterMobile: string;
  sms: string;
  phoneCall: string;
  verifyBtn: string;
  enterOtp: string;

  paymentSent: string;
  you: string;
  arrives: string;
  confirm: string;
  btnDone: string;
}

export interface IHeaders {
  screen1: string;
  screen2: string;
  screen3: string;
  screen4: string;
}
