
class TicketDto
{
  constructor({ _id, code, purchase_datetime, amount, purchase })
  {
      this.id = _id;
      this.code = code;
      this.purchase_datetime = purchase_datetime;
      this.amount = amount;
      this.purchase = purchase;
  }
}

export default TicketDto;
