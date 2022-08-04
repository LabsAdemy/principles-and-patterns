interface Alpha {
  propertyAlpha: string;
  methodAlpha(param: string): string;
}

class ConcreteAlpha implements Alpha {
  propertyAlpha = "";
  methodAlpha(param: string): string {
    return param;
  }
}

interface Bravo {
  propertyBravo: number;
  methodBravo(param: number): number;
}

class ConcreteBravo implements Bravo {
  propertyBravo = 0;
  methodBravo(param: number): number {
    return param;
  }
}

class BravoAdapter implements Alpha {
  constructor(private readonly bravo: Bravo) {}

  public get propertyAlpha(): string {
    return this.bravo.propertyBravo.toString();
  }
  public set propertyAlpha(value: string) {
    this.bravo.propertyBravo = parseInt(value);
  }

  public methodAlpha(param: string): string {
    const bravoParamAdapted = parseInt(param);
    const bravoResult = this.bravo.methodBravo(bravoParamAdapted);
    const bravoResultAdapted = bravoResult.toString();
    return bravoResultAdapted;
  }
}

class Client {
  public doSomethingAlpha(): string {
    const alpha = new ConcreteAlpha();
    alpha.propertyAlpha = "1";
    return alpha.methodAlpha("1");
  }

  public doSomethingBravo(): string {
    const bravo = new ConcreteBravo();
    const bravoAdapter = new BravoAdapter(bravo);
    bravoAdapter.propertyAlpha = "2";
    return bravoAdapter.methodAlpha("2");
  }
}

const client = new Client();
console.log("alpha", client.doSomethingAlpha());
console.log("bravo", client.doSomethingBravo());
