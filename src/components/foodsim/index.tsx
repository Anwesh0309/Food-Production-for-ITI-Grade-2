import { ComponentType } from 'react';
import { VirtualKitchenSim } from './sims/VirtualKitchenSim';
import { ChefUniformSim } from './sims/ChefUniformSim';
import { KitchenHygieneSim } from './sims/KitchenHygieneSim';
import { EquipmentIdSim } from './sims/EquipmentIdSim';
import { VegCutsSim } from './sims/VegCutsSim';
import { IngredientIdSim } from './sims/IngredientIdSim';
import { TempStorageSim } from './sims/TempStorageSim';
import { CookingMethodsSim } from './sims/CookingMethodsSim';
import { BakerySim } from './sims/BakerySim';
import { DoughPrepSim } from './sims/DoughPrepSim';
import { KitchenSafetySim } from './sims/KitchenSafetySim';
import { FoodSafetySim } from './sims/FoodSafetySim';
import { PlatingStudioSim } from './sims/PlatingStudioSim';

/**
 * Grade-2 Food Production (General) simulations — aligned to the CBSE 409 /
 * DGT CTS entry-level trade syllabus. Each simId below drives a distinct
 * interaction: layout, dress-up, sequencing, matching, timing or inspection.
 */
export const foodSimulations: Record<string, ComponentType> = {
  virtualKitchen: VirtualKitchenSim, // sections of a kitchen (floor plan)
  chefUniform: ChefUniformSim,       // protective clothing (dress the chef)
  kitchenHygiene: KitchenHygieneSim, // hand-washing step order
  equipmentId: EquipmentIdSim,       // equipment & appliances
  toolsCuts: VegCutsSim,             // knives, tools & vegetable cuts
  commodityId: IngredientIdSim,      // kitchen commodities sorting
  foodStorage: TempStorageSim,       // storage of commodities / cold chain
  cookingMethods: CookingMethodsSim, // methods of cooking
  bakery: BakerySim,                 // bakery — bake at the right heat
  doughPrep: DoughPrepSim,           // dough & batter preparation
  kitchenSafety: KitchenSafetySim,   // safety, first-aid & firefighting
  foodSafety: FoodSafetySim,         // food safety & cross-contamination
  plating: PlatingStudioSim,         // food presentation & plating
};

export function getFoodSimulation(simId: string): ComponentType | null {
  return foodSimulations[simId] ?? null;
}
