export class Bid{
  bidSecurity;
  city;
  deadline;
  grade;
  tel;
  title;
  type;
  constructor(title,type,grade,tel,deadline,bidSecurity){
    this.title=title;
    this.bidSecurity=bidSecurity;
    this.type=type;
    this.grade=grade;
    this.tel=tel;
    this.deadline=deadline;

  }

}
