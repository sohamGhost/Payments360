import { Injectable } from '@angular/core';
import { IAccountType } from '../common/interface/interface';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private header: string;
  private recipientName: string;
  private accountNumber: number;
  private mobileNumber: number;
  private payAmount: number;
  private accountType: IAccountType[];
  private enroller: string;
  private imagePicture: string;
  private paymentMode: string;
  private cardNumber: number;
  private feeDetail: string;
  private confirm: number;
  private tick: string;
  private zelle: string;
  private bank: string;
  private due: string;
  private subUser: string;
  private availableBal: string;
  private dropDown = [];
 // private selectedBillers = [];
  accountList: any;

  constructor() {}

  get user(): string {
    return this.header;
  }
  set user(val: string) {
    this.header = val;
  }
  get userLogo(): string {
    return this.imagePicture;
  }
  set userLogo(val: string) {
    this.imagePicture = val;
  }
  get recipient(): string {
    return this.recipientName;
  }
  set recipient(val: string) {
    this.recipientName = val;
  }
  get accountNo(): number {
    return this.accountNumber;
  }
  set accountNo(val: number) {
    this.accountNumber = val;
  }
  get mobile(): number {
    return this.mobileNumber;
  }
  set mobile(val: number) {
    this.mobileNumber = val;
  }
  get amount(): number {
    return this.payAmount;
  }
  set amount(val: number) {
    this.payAmount = val;
  }
  get accType(): IAccountType[] {
    return this.accountType;
  }
  set accType(val: IAccountType[]) {
    this.accountType = val;
  }
  get enrolledAs(): string {
    return this.enroller;
  }
  set enrolledAs(val: string) {
    this.enroller = val;
  }
  get paymentType(): string {
    return this.paymentMode;
  }
  set paymentType(val: string) {
    this.paymentMode = val;
  }
  get cardNo(): number {
    return this.cardNumber;
  }
  set cardNo(val: number) {
    this.cardNumber = val;
  }
  get fee(): string {
    return this.feeDetail;
  }
  set fee(val: string) {
    this.feeDetail = val;
  }
  get confirmation(): number {
    return this.confirm;
  }
  set confirmation(val: number) {
    this.confirm = val;
  }
  get tickImage(): string {
    return this.tick;
  }
  set tickImage(val: string) {
    this.tick = val;
  }
  get subUserLogo(): string {
    return this.subUser;
  }
  set subUserLogo(val: string) {
    this.subUser = val;
  }
  get bankLogo(): string {
    return this.bank;
  }
  set bankLogo(val: string) {
    this.bank = val;
  }
  get zelleImage(): string {
    return this.zelle;
  }
  set zelleImage(val: string) {
    this.zelle = val;
  }
  get dueDate(): string {
    return this.due;
  }
  set dueDate(val: string) {
    this.due = val;
  }
  get balance(): string {
    return this.availableBal;
  }
  set balance(val: string) {
    this.availableBal = val;
  }
  get dropDownDetails(): any[] {
    return this.dropDown;
  }
  set dropDownDetails(val: any[]) {
    this.dropDown = [...val];
  }
}
