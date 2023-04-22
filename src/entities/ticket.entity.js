
class Ticket
{
  constructor({ id, code, purchase_datetime, amount, purchase })
  {
      this.id = id.toString();
      this.code = code;
      this.purchase_datetime = purchase_datetime;
      this.amount = amount;
      this.purchase = purchase;
  }
}

export default Ticket;
