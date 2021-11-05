import { BggType } from "../models/game-detail";

export const baseBoardGameGeekUrl = 'https://boardgamegeek.com/xmlapi2';

export interface BoardGameGeekQueryResult {
  items: {
    $: {
      total: number;
      termsofuse: string;
    };
    item: {
      $: {
        id: string;
        type: 'boardgame';
      };
      name: {
        $: {
          type: string;
          value: string;
        };
      }[];
      yearpublished: [{
        $: { value: string };
      }];
    }[];
  };
}

export interface BoardGameGeekLoadResult {
  items: {
    $: {
      termsofuse: 'https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use';
    };
    item: [{
      $: {
        type: 'boardgame';
        id: string;
      };
      description: string[];
      image: string[];
      thumbnail: string[];
      link: {
        $: {
          id: string;
          type: BggType;
          value: string;
        };
      }[];
      maxplayers: [{
        $: { value: string };
      }];
      maxplaytime: [{
        $: { value: string };
      }];
      minage: [{
        $: { value: string };
      }];
      minplayers: [{
        $: { value: string };
      }];
      minplaytime: [{
        $: { value: string };
      }];
      name: {
        $: {
          type: string;
          sortindex: string;
          value: string;
        };
      }[];
      playingtime: [{
        $: { value: string };
      }];
      yearpublished: [{
        $: { value: string };
      }];
    }];
  };
}
