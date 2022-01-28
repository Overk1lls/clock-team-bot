import { fetchAPI } from "./lib/utils";

export default class FetchBlizzardService {
    private _blizzardToken: string;

    constructor(blizzAuthToken: string) {
        const url = 'https://eu.battle.net/oauth/token';
        const method = 'POST';
        const body = 'grant_type=client_credentials';
        const headers = {
            authorization: 'Basic ' + blizzAuthToken,
            contentType: 'application/x-www-form-urlencoded'
        };

        fetchAPI(
            url,
            method,
            blizzAuthToken,
            body,
            headers.authorization,
            headers.contentType
        )
            .then(token => this._blizzardToken = token.access_token);    
    }

    fetchRIO = (
        character: string,
        realm: string,
        region: string,
        fields = 'mythic_plus_recent_runs'
    ) => {
        const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=${fields}`;
        return fetchAPI(url);
    };

    fetchRealmData = (
        region: string,
        realm: string
    ) => {
        const url = `https://${region}.api.blizzard.com/data/wow/realm/${realm}?namespace=dynamic-${region}`;
        return fetchAPI(url, 'GET', this._blizzardToken);
    };

    fetchRealmStatus = (
        region: string,
        realm: string
    ) => {
        const url = `https://${region}.api.blizzard.com/data/wow/connected-realm/${realm}?namespace=dynamic-${region}`;
        return fetchAPI(url, 'GET', this._blizzardToken);
    };
};