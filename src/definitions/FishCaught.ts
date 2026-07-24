export interface FishCaught {
	itemId: number;
	size: number;
	unknown: number; // Number of fish caught. 1 unless using Double or Triple Hook
	unknown2: number;
	flags: number; // flags:
		// ((flags >> 0) & 1)) => 'fish_can_mooch' => some other fish can eat this fish
		// ((flags >> 1) & 1)) => 'new_fish' => you've never caught this fish before
		// ((flags >> 2) & 1)) => 'in_fishguide' => this fish exists somewhere in the fish guide
		// ((flags >> 3) & 1)) => 'new_record' => "new record set for <location> !!" text
		// ((flags >> 4) & 1)) => 'large' => fish has [large] pop-up
		// ((flags >> 5) & 1)) => 'collectable' => set if the collectable screen choice is "yes"
		// ((flags >> 6) & 1)) => '??' => possibly the defunct HQ tag?
		// ((flags >> 7) & 1)) => 'permit_mooch1' => true if fish is large OR if MSB is active
}
