import { BufferReader } from "../../BufferReader";
import { PlayerStats } from "../../definitions";

export function playerStats(reader: BufferReader): PlayerStats {
	return {
		strength: reader.nextUInt32(),
		dexterity: reader.nextUInt32(),
		vitality: reader.nextUInt32(),
		intelligence: reader.nextUInt32(),
		mind: reader.nextUInt32(),
		piety: reader.nextUInt32(),
		hp: reader.nextUInt32(),
		mp: reader.nextUInt32(),
		tp: reader.nextUInt32(),
		gp: reader.nextUInt32(),
		cp: reader.nextUInt32(),
		delay: reader.nextUInt32(),
		tenacity: reader.nextUInt32(),
		attackPower: reader.nextUInt32(),
		defense: reader.nextUInt32(),
		directHitRate: reader.nextUInt32(),
		evasion: reader.nextUInt32(),
		magicDefense: reader.nextUInt32(),
		criticalHit: reader.nextUInt32(),
		attackMagicPotency: reader.nextUInt32(),
		healingMagicPotency: reader.nextUInt32(),
		elementalBonus: reader.nextUInt32(),
		determination: reader.nextUInt32(),
		skillSpeed: reader.nextUInt32(),
		spellSpeed: reader.nextUInt32(),
		haste: reader.nextUInt32(),
		craftsmanship: reader.nextUInt32(),
		control: reader.nextUInt32(),
		gathering: reader.nextUInt32(),
		perception: reader.nextUInt32(),
		unknown: Array.from(new Uint32Array(reader.nextBuffer(32 * 26))),
	};
}
