export interface PokemonData {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  }
  
  export interface PokemonSpeciesData {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
    genera: {
      genus: string;
      language: {
        name: string;
      };
    }[];
  }

  