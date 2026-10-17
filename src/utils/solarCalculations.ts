import { SolarCalculationInput, SolarEstimate } from '@/types';
import { SOLAR_REGIONS, SOLAR_BENCHMARK_ASSUMPTIONS } from '@/data/constants';

export function calculateSolarFeasibility(input: SolarCalculationInput): SolarEstimate {
  const region = SOLAR_REGIONS.find((r) => r.state === input.locationState) || {
    state: input.locationState,
    peakSunHours: 4.8,
    averageTariff: 8.0,
  };

  const tariff = Math.max(1, input.electricityTariff || region.averageTariff);
  const monthlyBill = Math.max(100, input.monthlyBill);
  const availableArea = Math.max(10, input.availableRoofAreaSqFt);

  // Consumption in units (kWh)
  const monthlyConsumptionKwh = Math.round(monthlyBill / tariff);
  const dailyConsumptionKwh = monthlyConsumptionKwh / 30;

  // Daily generation per 1 kWp = 1 * peakSunHours * efficiency
  const dailyGenPerKw = region.peakSunHours * SOLAR_BENCHMARK_ASSUMPTIONS.systemEfficiency;
  
  // Target capacity to meet ~95% of demand
  const rawCapacity = dailyConsumptionKwh / dailyGenPerKw;
  const suggestedCapacityKw = Math.max(1, Number(rawCapacity.toFixed(1)));

  // Area requirement (90 sq ft per kW)
  const rooftopAreaRequiredSqFt = Math.round(suggestedCapacityKw * SOLAR_BENCHMARK_ASSUMPTIONS.spacePerKwSqFt);
  const areaSufficient = availableArea >= rooftopAreaRequiredSqFt;

  // Cap effective generation if area is constrained
  const maxPossibleCapacityByArea = Number((availableArea / SOLAR_BENCHMARK_ASSUMPTIONS.spacePerKwSqFt).toFixed(1));
  const effectiveCapacityKw = areaSufficient ? suggestedCapacityKw : Math.max(0.5, maxPossibleCapacityByArea);

  // Capital expenditure
  const approximateCostInr = Math.round(effectiveCapacityKw * SOLAR_BENCHMARK_ASSUMPTIONS.costPerKwInr);

  // Generation & Savings
  const monthlyGenerationKwh = Math.round(effectiveCapacityKw * dailyGenPerKw * 30);
  const rawMonthlySavings = monthlyGenerationKwh * tariff;
  const monthlySavingsInr = Math.round(Math.min(monthlyBill, rawMonthlySavings));
  const annualSavingsInr = monthlySavingsInr * 12;

  // Simple payback period
  const paybackPeriodYears = annualSavingsInr > 0 
    ? Number((approximateCostInr / annualSavingsInr).toFixed(1)) 
    : 0;

  // 25-Year Cumulative Savings Model
  // Factoring 0.7% annual solar panel degradation and 3.5% grid tariff inflation
  let cumulativeSavings = -approximateCostInr;
  let currentAnnualGen = monthlyGenerationKwh * 12;
  let currentTariff = tariff;

  for (let year = 1; year <= 25; year++) {
    const yearSavings = currentAnnualGen * currentTariff;
    cumulativeSavings += yearSavings;
    currentAnnualGen *= (1 - 0.007); // 0.7% degradation
    currentTariff *= (1 + (SOLAR_BENCHMARK_ASSUMPTIONS.tariffEscalationRatePercent / 100)); // 3.5% tariff rise
  }

  const lifetimeSavings25YrInr = Math.max(0, Math.round(cumulativeSavings));

  // Environmental Metrics
  const annualCo2OffsetKg = Math.round(
    monthlyGenerationKwh * 12 * SOLAR_BENCHMARK_ASSUMPTIONS.co2FactorPerKwh
  );
  const equivalentTreesPlanted = Math.max(1, Math.round(
    annualCo2OffsetKg / SOLAR_BENCHMARK_ASSUMPTIONS.treeAbsorptionKgPerYr
  ));

  return {
    monthlyBill,
    electricityTariff: tariff,
    availableRoofAreaSqFt: availableArea,
    locationState: region.state,
    monthlyConsumptionKwh,
    suggestedCapacityKw: effectiveCapacityKw,
    rooftopAreaRequiredSqFt,
    areaSufficient,
    approximateCostInr,
    monthlySavingsInr,
    annualSavingsInr,
    paybackPeriodYears,
    lifetimeSavings25YrInr,
    annualCo2OffsetKg,
    equivalentTreesPlanted,
    assumptions: {
      peakSunHours: region.peakSunHours,
      systemEfficiency: SOLAR_BENCHMARK_ASSUMPTIONS.systemEfficiency,
      spacePerKwSqFt: SOLAR_BENCHMARK_ASSUMPTIONS.spacePerKwSqFt,
      costPerKwInr: SOLAR_BENCHMARK_ASSUMPTIONS.costPerKwInr,
      tariffEscalationRatePercent: SOLAR_BENCHMARK_ASSUMPTIONS.tariffEscalationRatePercent,
    },
  };
}
