import { Injectable, NotFoundException } from '@nestjs/common';
import { Banner, CardType, GachaItem, Rarity, RollResult, RateUpItem } from '../gacha.interfaces';
import { ALL_CES, ALL_SERVANTS, BANNERS_DATA } from '../gacha.data';

// Tasas base FGO (simplificadas)
const BASE_RATES = {
  SSR_SERVANT: 0.01, // 1%
  SR_SERVANT: 0.03,  // 3%
  R_SERVANT: 0.40,   // 40%
  SSR_CE: 0.04,      // 4%
  SR_CE: 0.12,       // 12%
  R_CE: 0.40,        // 40%
};
// Suma total: 1.00 (100%)

@Injectable()
export class GachaService {
  private banners: Banner[] = BANNERS_DATA;
  private allServants: GachaItem[] = ALL_SERVANTS;
  private allCEs: GachaItem[] = ALL_CES;

  findAllBanners(): Banner[] {
    return this.banners;
  }

  findBannerById(id: string): Banner | undefined {
    return this.banners.find(b => b.id === id);
  }

  performRoll(bannerId: string, isMultiRoll: boolean = false): RollResult[] {
    const banner = this.findBannerById(bannerId);
    if (!banner) {
      throw new NotFoundException(`Banner with ID ${bannerId} not found`);
    }

    const numRolls = isMultiRoll ? 10 : 1; 
    let results: RollResult[] = [];

    for (let i = 0; i < numRolls; i++) {
      results.push(this.getSingleRollResult(banner));
    }


    if (isMultiRoll) {
      const hasMinSR = results.some(r => r.rarity === Rarity.SR || r.rarity === Rarity.SSR);
      const hasServant = results.some(r => r.type === CardType.SERVANT);

      if (!hasMinSR) {
        const rIndex = results.findIndex(r => r.rarity === Rarity.R);
        if (rIndex !== -1) {
          results[rIndex] = this.getGuaranteedCard(banner, [Rarity.SR, Rarity.SSR]);
        } else { 
          results[0] = this.getGuaranteedCard(banner, [Rarity.SR, Rarity.SSR]);
        }
      }
      
      const hasServantAfterSRGuarantee = results.some(r => r.type === CardType.SERVANT);

      if (!hasServantAfterSRGuarantee) {
        let replaceIndex = results.findIndex(r => r.type === CardType.CE && r.rarity === Rarity.R);
        if (replaceIndex === -1) { 
            replaceIndex = results.findIndex(r => r.type === CardType.CE);
        }
        if (replaceIndex === -1) { 
            replaceIndex = 0; 
        }

        const currentSRSSRs = results.filter(r => r.rarity === Rarity.SR || r.rarity === Rarity.SSR);
        if (currentSRSSRs.length === 1 && (results[replaceIndex].rarity === Rarity.SR || results[replaceIndex].rarity === Rarity.SSR)) {
            const alternativeIndex = results.findIndex(r => r.rarity === Rarity.R);
            if (alternativeIndex !== -1) replaceIndex = alternativeIndex;
        }

        results[replaceIndex] = this.getGuaranteedCard(banner, [Rarity.R, Rarity.SR, Rarity.SSR], CardType.SERVANT);
      }
    }
    return results;
  }

  private getSingleRollResult(banner: Banner): RollResult {
    const rand = Math.random();
    let cumulativeRate = 0;

    // Determinar Tipo y Rareza general
    // SSR Servant (1%)
    cumulativeRate += BASE_RATES.SSR_SERVANT;
    if (rand < cumulativeRate) {
      return this.getItem(banner, Rarity.SSR, CardType.SERVANT);
    }
    // SR Servant (3%)
    cumulativeRate += BASE_RATES.SR_SERVANT;
    if (rand < cumulativeRate) {
      return this.getItem(banner, Rarity.SR, CardType.SERVANT);
    }
    // SSR CE (4%)
    cumulativeRate += BASE_RATES.SSR_CE;
    if (rand < cumulativeRate) {
      return this.getItem(banner, Rarity.SSR, CardType.CE);
    }
    // SR CE (12%)
    cumulativeRate += BASE_RATES.SR_CE;
    if (rand < cumulativeRate) {
      return this.getItem(banner, Rarity.SR, CardType.CE);
    }
    // R Servant (40%)
    cumulativeRate += BASE_RATES.R_SERVANT;
    if (rand < cumulativeRate) {
      return this.getItem(banner, Rarity.R, CardType.SERVANT);
    }
    // R CE (40%)
    cumulativeRate += BASE_RATES.R_CE; 
    if (rand < cumulativeRate || rand <= 1) { 
      return this.getItem(banner, Rarity.R, CardType.CE);
    }
    
    console.error("Error en la lógica de tasas, rand fue:", rand, "cum:", cumulativeRate);
    return this.getItem(banner, Rarity.R, CardType.CE); 
  }

  private getItem(banner: Banner, rarity: Rarity, type: CardType): RollResult {
    const isServant = type === CardType.SERVANT;
    const rateUpPool = isServant ? banner.rateUpServants : banner.rateUpCEs;
    const generalPool = (isServant ? this.allServants : this.allCEs)
                        .filter(item => item.rarity === rarity);

    const rateUpItemsInRarity = rateUpPool.filter(item => item.rarity === rarity);

    let selectedItem: GachaItem | undefined;
    let isRateUp = false;

    if (rateUpItemsInRarity.length > 0) {

      const specificRateUp = rateUpItemsInRarity[0];

      const chanceForThisRateUpItem = specificRateUp.rateUpPercentage / (
        isServant ? 
          (rarity === Rarity.SSR ? BASE_RATES.SSR_SERVANT : rarity === Rarity.SR ? BASE_RATES.SR_SERVANT : BASE_RATES.R_SERVANT) :
          (rarity === Rarity.SSR ? BASE_RATES.SSR_CE : rarity === Rarity.SR ? BASE_RATES.SR_CE : BASE_RATES.R_CE)
      );


      if (Math.random() < chanceForThisRateUpItem) {
        selectedItem = specificRateUp;
        isRateUp = true;
      }
    }

    if (!selectedItem) {
      const nonRateUpGeneralPool = generalPool.filter(
        item => !rateUpItemsInRarity.some(ru => ru.id === item.id)
      );
      
      if (nonRateUpGeneralPool.length > 0) {
        selectedItem = nonRateUpGeneralPool[Math.floor(Math.random() * nonRateUpGeneralPool.length)];
      } else if (generalPool.length > 0) { 
        selectedItem = generalPool[Math.floor(Math.random() * generalPool.length)];
      }
    }
    
    if (!selectedItem) {
        if (generalPool.length > 0) {
            selectedItem = generalPool[Math.floor(Math.random() * generalPool.length)];
        } else if (rateUpItemsInRarity.length > 0) {
            selectedItem = rateUpItemsInRarity[Math.floor(Math.random() * rateUpItemsInRarity.length)];
            isRateUp = true; 
        } else {
            console.error(`No item found for rarity ${rarity} and type ${type}. Banner: ${banner.id}. Check data pools.`);
            const fallbackCE = ALL_CES.find(c => c.id === 'ce005')!;
            return { ...fallbackCE, isRateUp: false };
        }
    }

    return { ...selectedItem!, isRateUp };
  }

  // Método para obtener una carta garantizada (SR+ o Servant)
  private getGuaranteedCard(banner: Banner, rarities: Rarity[], type?: CardType): RollResult {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)]; 
    
    let cardType = type;
    if (!cardType) { // Si el tipo no está especificado, elige aleatoriamente entre Servant o CE
        // Para SR+, hay más chance de CE que de Servant según tasas base (16% vs 4%)
        // SSR_SERVANT: 0.01, SR_SERVANT: 0.03, SSR_CE: 0.04, SR_CE: 0.12
        const servantChance = (rarity === Rarity.SSR ? BASE_RATES.SSR_SERVANT : BASE_RATES.SR_SERVANT);
        const ceChance = (rarity === Rarity.SSR ? BASE_RATES.SSR_CE : BASE_RATES.SR_CE);
        cardType = Math.random() < (servantChance / (servantChance + ceChance)) ? CardType.SERVANT : CardType.CE;
    }

    if (type === CardType.SERVANT && !rarities.includes(Rarity.R) && rarities.length === 3 /* R,SR,SSR */) {
        const randServantRarity = Math.random();
        if (randServantRarity < 0.85) cardType = CardType.SERVANT; 
        else if (randServantRarity < 0.98) cardType = CardType.SERVANT; 
        else cardType = CardType.SERVANT; 
    }



    const pool = (cardType === CardType.SERVANT ? this.allServants : this.allCEs)
                  .filter(item => item.rarity === rarity);
    
    const nonRateUpPool = pool.filter(
        item => !(cardType === CardType.SERVANT ? banner.rateUpServants : banner.rateUpCEs)
                    .some(ru => ru.id === item.id && ru.rarity === rarity)
    );

    let selectedItem: GachaItem | undefined;
    if (nonRateUpPool.length > 0) {
        selectedItem = nonRateUpPool[Math.floor(Math.random() * nonRateUpPool.length)];
    } else if (pool.length > 0) { // Si todos los de esa rareza/tipo son rate-up
        selectedItem = pool[Math.floor(Math.random() * pool.length)];
    }

    if (!selectedItem) { 
        console.error(`Guaranteed card pool empty for rarity ${rarity}, type ${cardType}. Returning default.`);
        const fallback = this.allServants.find(s => s.rarity === Rarity.R)!; 
        return { ...fallback, isRateUp: false };
    }
    return { ...selectedItem, isRateUp: false }; 
  }
}