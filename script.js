
const customerArray =[];

function initialize()
{
  ppl1 = document.getElementById("p1");
  ppl2 = document.getElementById("p2");
  ppl3 = document.getElementById("p3");
  bestp = document.getElementById("bp");
  worstp = document.getElementById("wp");
  dataNow=0;
  plan1=0;
  plan2=0;
  plan3=0;
  num1=0;
  num2=0;
  num3=0;
  useBest=0;
  useWorst=0;
  for(var i=0; i<1000;i++)
  {
    da=getData();
    pt=getPlan();
    pc=planCost(pt,da);
    p1=planCost(1,da);
    p2=planCost(2,da);
    p3=planCost(3,da);
    customerArray[i]=new Customer(da,pt,pc,p1,p2,p3);
  }
  fillTable();
  fillChart();
}

class Customer
{
  constructor(d,p,c,o,tw,th)
  {
    this.dataA=d;
    this.planT=p;
    this.cost=c;
    this.planO=o;
    this.planTw=tw;
    this.planTh=th;
  }
}

function fillTable()
{
  for(var i=0;i<1000;i++)
  {
    var newRow=info.insertRow();
    var newCell=newRow.insertCell();
    newCell.innerHTML=i+1;

    newCell1=newRow.insertCell();
    newCell1.innerHTML=customerArray[i].dataA +" MB";

    newCell2=newRow.insertCell();
    newCell2.innerHTML= customerArray[i].planT;

    newCell3=newRow.insertCell();
    newCell3.innerHTML="$" + customerArray[i].cost;

    newCell4=newRow.insertCell();
    newCell4.innerHTML= "$" + customerArray[i].planO;

    newCell5=newRow.insertCell();
    newCell5.innerHTML= "$" + customerArray[i].planTw;

    newCell6=newRow.insertCell();
    newCell6.innerHTML= "$" + customerArray[i].planTh;
  }
}
function fillChart()
{
  for(var i=0;i<1000;i++)
  {
    if(customerArray[i].planT==1)
    {
      plan1++;
    }
    if(customerArray[i].planT==2)
    {
      plan2++;
    }
    if(customerArray[i].planT==3)
    {
      plan3++;
    }
  }
    ppl1.innerHTML=plan1;
    ppl2.innerHTML=plan2;
    ppl3.innerHTML=plan3;
  for(var i=0;i<1000;i++)
  {
    useBest+=bestPlan(i);
    percent=(useBest/1000)*100;
    bestp.innerHTML=Math.round(100*percent)/100+"%";

    if(bestPlan(i)==0)
    {
      useWorst++;
      percent=(useWorst/1000)*100;
      worstp.innerHTML=Math.round(100*percent)/100+"%";
    }
  }
}

function getNumber()
{
  return Math.floor(Math.random()*(10000000000-1000000000)+1000000000);
  //Generates random 10 digit number for cell phone number
}
function getData()
{
  return Math.floor(Math.random()*(40001-1)+1);
}
function getPlan()
{
  return Math.floor(Math.random()*(4-1)+1);
}

function planCost(type,data)
{
  if(type==1)
  {
    cost=19.99;
    dataNow=data-1000;
    for(var i=0;i<dataNow;i++)
    {
      cost+=0.10;
    }
    return Math.round(100*cost)/100;
  }
  if(type==2)
  {
    cost=24.99;
    dataNow=data-4000;
    for(var i=0;i<dataNow;i++)
    {
      cost+=0.25;
    }
    return cost;
  }
  if(type==3)
  {
    cost=4.99;
    for(var i=0;i<data;i++)
    {
      cost+=0.02;
    }
    return Math.round(100*cost)/100;
  }
}
function bestPlan(n)
{
  cost1=customerArray[n].planO;
  cost2=customerArray[n].planTw;
  cost3=customerArray[n].planTh;
  planType=customerArray[n].planT;
  
  if(cost1<cost2 && cost1<cost3 && planType==1)
  {
    return 1; 
  }
  else if(cost2<cost3 && cost2<cost1 && planType==2)
  {
    return 1;
  }
  else if(cost3<cost1 && cost3<cost2 && planType==3)
  {
    return 1;
  }
  return 0;
}