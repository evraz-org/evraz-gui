/**
 * Settings storage for all Gateway Services
 * General API Settings are stored in api/apiConfig and should be imported here
 */

import {ioxbankAPIs, gdex2APIs, pirateCashAPIs, xbtsxAPIs} from "api/apiConfig";
import {allowedGateway} from "branding";
import {isGatewayTemporarilyDisabled} from "../chain/onChainConfig";
import SettingsStore from "stores/SettingsStore";

const _isEnabled = gatewayKey => {
    return async function(options = {}) {
        if (__DEV__) {
            console.log("Checking " + gatewayKey + " gateway ...");
        }
        if (!options.onlyOnChainConfig) {
            // is the gateway configured in branding?
            const setInBranding = allowedGateway(gatewayKey);
            if (!setInBranding) {
                if (__DEV__) {
                    console.log("  ... disabled in branding.js");
                }
                return false;
            } else {
                if (!!options.onlyBranding) {
                    if (__DEV__) {
                        console.log("  ... may be used!");
                    }
                    return true;
                }
            }
        }
        // is it deactivated on-chain?
        const temporarilyDisabled = await isGatewayTemporarilyDisabled(
            gatewayKey
        );
        if (temporarilyDisabled) {
            if (__DEV__) {
                console.log("  ... disabled on-chain");
            }
            return false;
        } else {
            if (!!options.onlyOnChainConfig) {
                if (__DEV__) {
                    console.log("  ... may be used!");
                }
                return true;
            }
        }
        // has the user filtered it out?
        let filteredServiceProviders = SettingsStore.getState().settings.get(
            "filteredServiceProviders",
            []
        );
        if (!filteredServiceProviders) {
            filteredServiceProviders = [];
        }
        let userAllowed = false;
        if (
            filteredServiceProviders.length == 1 &&
            filteredServiceProviders[0] == "all"
        ) {
            userAllowed = true;
        } else {
            userAllowed = filteredServiceProviders.indexOf(gatewayKey) >= 0;
        }
        if (!userAllowed) {
            if (__DEV__) {
                console.log("  ... disabled by user");
            }
            return false;
        }
        if (__DEV__) {
            console.log("  ... may be used!");
        }
        return true;
    };
};

export const availableGateways = {
    IOB: {
        id: "IOB",
        name: "ioxbank",
        baseAPI: ioxbankAPIs,
        isEnabled: _isEnabled("IOB"),
        isSimple: true,
        selected: false,
        simpleAssetGateway: true,
        fixedMemo: {
            prepend_default: "dex:",
            prepend_btsid: "",
            append: ""
        },
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://ioxbank.com",
        wallet: "https://dex.iobanker.com/"
    },
    GDEX: {
        id: "GDEX",
        name: "GDEX",
        baseAPI: gdex2APIs,
        isEnabled: () => false,
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://bitsharestalk.org/index.php?topic=33861",
        wallet: "Only manual deposit / withdraw",
        comment: "Only manual deposit / withdraw"
    },
    PIRATE: {
        id: "PIRATE",
        name: "PirateCash",
        baseAPI: pirateCashAPIs,
        isEnabled: _isEnabled("PIRATE"),
        isSimple: true,
        selected: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://piratecash.net",
        wallet: "https://wallet.piratecash.net/"
    },
    XBTSX: {
        id: "XBTSX",
        name: "XBTS Native Chains",
        baseAPI: xbtsxAPIs,
        isEnabled: _isEnabled("XBTSX"),
        isSimple: true,
        selected: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    }
};

export const availableBridges = {
    TRADE: {
        id: "TRADE",
        name: "Blocktrades",
        isEnabled: _isEnabled("TRADE"),
        landing: "https://blocktrades.us"
    }
};

export const gatewayPrefixes = Object.keys(availableGateways);

export function getPossibleGatewayPrefixes(bases) {
    return gatewayPrefixes.reduce((assets, prefix) => {
        bases.forEach(a => {
            assets.push(`${prefix}.${a}`);
        });
        return assets;
    }, []);
}

export default availableGateways;
