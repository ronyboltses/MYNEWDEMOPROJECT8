export interface BasicCalculation {
  plotSize: number;
  floors: number;
  quality: string;
  bathrooms: number;
  bedrooms: number;
  locationType: string;
  timeline: number;
  basement: boolean;
  garage: boolean;
}

export interface AdvancedCalculation {
  length: number;
  width: number;
  floors: number;
  doors: number;
  windows: number;
  kitchens: number;
  lounges: number;
  rooms: Room[];
  parking: boolean;
  tanks: number;
  isFullEscape: boolean;
  flooringType: string;
  paintType: string;
  plasterType: string;
  laborCount: number;
}

export interface Room {
  length: number;
  width: number;
  type: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  dateAdded: string;
  type: 'pdf' | 'doc' | 'image';
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  dateAdded: string;
}

export interface AdminSettings {
  siteName: string;
  logo: string;
  logoUrl: string;
  brandColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  reportHeader: string;
  reportFooter: string;
  pricePerSqFt: number;
  laborCostPerDay: number;
  brickPrice: number;
  cementPrice: number;
  steelPrice: number;
  plumbingCostPerSqFt: number;
  electricalCostPerSqFt: number;
  mortarRatio: string;
  sandPrice: number;
  resources: Resource[];
  feedback: Feedback[];
  adminCredentials: {
    username: string;
    password: string;
  };
  assumptions: {
    bricksPerSqFt: number;
    cementBagsPerSqFt: number;
    steelPerSqFt: number;
    laborProductivityPerDay: number;
    mortarPerBrick: number;
    sandPerBag: number;
    builtUpAreaFactor: number;
    largePlotFactor: number;
    materialCostFactor: number;
    laborCostFactor: number;
    foundationCostPerSqFt: number;
    flooringCostPerSqFt: number;
    paintingCostPerSqFt: number;
    plasteringCostPerSqFt: number;
    windowCost: number;
    doorCost: number;
    kitchenBaseCost: number;
    waterTankCost: number;
    parkingCost: number;
    fullEscapePremium: number;
    basementCost: number;
    garageCost: number;
    timelineBaseCost: number;
    timelineFactorPerMonth: number;
    locationFactors: {
      urban: number;
      suburban: number;
      rural: number;
    };
    qualityFactors: {
      standard: number;
      premium: number;
      luxury: number;
    };
  };
}