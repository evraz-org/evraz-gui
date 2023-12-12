import {Apis} from "bitsharesjs-ws";
/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Determine if we are running on testnet or mainnet
 * @private
 */
function _isTestnet() {
    const testnet =
        "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"; // just for the record
    const mainnet =
        "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8";

    // treat every other chain as testnet
    return Apis.instance().chain_id !== mainnet;
}

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "Evraz";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://evrazdex.org";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */
export function getFaucet() {
    return {
        url: "https://faucet-evrazdex.org", // 2017-12-infrastructure worker proposal
        show: true,
        editable: false,
        referrer: "evraz"
    };
}

export function getTestFaucet() {
    // fixme should be solved by introducing _isTestnet into getFaucet and fixing the mess in the Settings when fetching faucet address
    return {
        url: "https://faucet.testnet.bitshares.eu", // operated as a contribution by BitShares EU
        show: true,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/evraz_big.png").default;
    // return "/assets/evraz_big.png";
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "midnightTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */
export function getUnits() {
    if (_isTestnet()) {
        return ["TEST"];
    }
    return ["EVRAZ", "BTS", "USD", "CNY", "BTC", "EUR", "GBP", "RUBLE"];
}

export function getDefaultMarket() {
    if (_isTestnet()) {
        return "USD_TEST";
    }
    return "EVRAZ_BTS";
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */
export function getMyMarketsBases() {
    if (_isTestnet()) {
        return ["TEST"];
    }
    return [
        "EVRAZ",
        "BTS",
        "EUR",
        "RUBLE",
        "GBP",
        "CNY",
        "JPY",
        "XBTSX.BTC",
        "USDIGI",
        "EUROLUX",
        "ALTIN",
        "ALTIN.TRY",
        "ALTIN.RUB"
    ];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    if (_isTestnet()) {
        return ["TEST"];
    }
    let tokens = {
        nativeTokens: [
            "EVRAZ",
            "BTC",
            "BTC1.0",
            "BTS",
            "CNY",
            "CNY1.0",
            "EUR",
            "EUR1.0",
            "GOLD",
            "GOLD1.0",
            "RUBLE",
            "RUB1.0",
            "SILVER",
            "SILVER1.0",
            "USD",
            "USD1.0",
            "USDIGI",
            "GBP",
            "JPY",
            "EUROLUX",
            "ALTIN",
            "ALTIN.TRY",
            "ALTIN.RUB"
        ],
        gdexTokens: [],
        openledgerTokens: [],
        rudexTokens: [],
        piratecashTockens: [
            "PIRATE.PIRATE",
            "PIRATE.BTC",
            "PIRATE.LTC",
            "PIRATE.BCC",
            "PIRATE.DOGE",
            "PIRATE.COSA"
        ],
        xbtsxTokens: [
            "XBTSX.STH",
            "XBTSX.POST",
            "XBTSX.DOGE",
            "XBTSX.BTC",
            "XBTSX.LTC",
            "XBTSX.DASH",
            "XBTSX.BTG",
            "XBTSX.NVC",
            "XBTSX.42",
            "XBTSX.NMC",
            "XBTSX.WAVES",
            "XBTSX.ETH",
            "XBTSX.ONION",
            "XBTSX.EGC",
            "XBTSX.BCH",
            "XBTSX.MDL",
            "XBTSX.SKY",
            "XBTSX.SLB",
            "XBTSX.GRS",
            "XBTSX.XSM",
            "XBTSX.XBB",
            "XBTSX.EXR",
            "XBTSX.BCCX",
            "XBTSX.GUAP",
            "XBTSX.AXAI",
            "XBTSX.TUSD",
            "XBTSX.USDT",
            "XBTSX.RVN",
            "XBTSX.TRD",
            "XBTSX.SCH",
            "XBTSX.USDN",
            "XBTSX.FIL",
            "XBTSX.EOS",
            "XBTSX.RUB",
            "XBTSX.USD",
            "XBTSX.EUR",
            "XBTSX.VTC",
            "XBTSX.USDC",
            "XBTSX.BAT",
            "XBTSX.PING",
            "XBTSX.ATRI",
            "XBTSX.BNB",
            "XBTSX.BUSD",
            "XBTSX.TRX",
            "XBTSX.HT",
            "XBTSX.XRP",
            "XBTSX.SHU",
            "XBTSX.UNI",
            "XBTSX.HIVE",
            "XBTSX.EMC",
            "XBTSX.NESS",
            "XBTSX.PPC",
            "XBTSX.SHIB",
            "XBTSX.HBD",
            "XBTSX.PIVX",
            "XBTSX.AVAX",
            "XBTSX.RTM",
            "XBTSX.XAUT",
            "XBTSX.TUSC",
            "XBTSX.MATIC",
            "XBTSX.HVQ",
            "XBTSX.TCG",
            "XBTSX.NCH",
            "XBTSX.LUNR",
            "XBTSX.LUNAREUM"
        ],
        honestTokens: [
            "HONEST",
            "HONEST.MONEY",
            "HONEST.AGORISM",
            "HONEST.DEV",
            "HONEST.CNY",
            "HONEST.USD",
            "HONEST.BTC",
            "HONEST.XAU",
            "HONEST.XAG",
            "HONEST.ETH",
            "HONEST.XRP",
            "HONEST.XRP1",
            "HONEST.ETH1",
            "HONEST.USDSHORT",
            "HONEST.BTCSHORT",
            "HONEST.ADA",
            "HONEST.DOT",
            "HONEST.LTC",
            "HONEST.SOL",
            "HONEST.XMR",
            "HONEST.ATOM",
            "HONEST.XLM",
            "HONEST.ALGO",
            "HONEST.FIL",
            "HONEST.EOS",
            "HONEST.RUB",
            "HONEST.EUR",
            "HONEST.GBP",
            "HONEST.JPY",
            "HONEST.KRW",
            "HONEST.ADASHORT",
            "HONEST.DOTSHORT",
            "HONEST.LTCSHORT",
            "HONEST.SOLSHORT",
            "HONEST.XMRSHORT",
            "HONEST.ATOMSHORT",
            "HONEST.XLMSHORT",
            "HONEST.ALGOSHORT",
            "HONEST.FILSHORT",
            "HONEST.EOSSHORT",
            "HONEST.RUBSHORT",
            "HONEST.EURSHORT",
            "HONEST.GBPSHORT",
            "HONEST.JPYSHORT",
            "HONEST.KRWSHORT",
            "HONEST.XRPSHORT",
            "HONEST.ETHSHORT",
            "HONEST.XAUSHORT",
            "HONEST.XAGSHORT",
            "HONEST.CNYSHORT"
        ],
        ioxbankTokens: ["IOB.XRP", "IOB.XLM"],
        otherTokens: ["CVCOIN", "HERO", "OCT", "HERTZ", "YOYOW"]
    };

    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    if (_isTestnet()) {
        return [["USD", "TEST"]];
    }
    return [
        ["EVRAZ", "BTS"],
        ["EVRAZ", "RUBLE"],
        ["EVRAZ", "EUR"],
        ["EVRAZ", "CNY"],
        ["EVRAZ", "HONEST.USD"],
        ["EVRAZ", "RUDEX.BTC"],
        ["EVRAZ", "XBTSX.BTC"],
        ["EVRAZ", "XBTSX.STH"],
        ["EVRAZ", "CRUDE.NGN"],
        ["USD", "BTS"],
        ["USD", "GOLD"],
        ["USD", "HERO"],
        ["USD", "HONEST.BTC"],
        ["USD", "HONEST.USD"],
        ["USD", "HONEST.BTCSHORT"],
        ["USD", "HONEST.USDSHORT"],
        ["USD", "HERTZ"],
        ["USD", "URTHR"],
        ["USD", "SKULD"],
        ["USD", "VERTHANDI"],
        ["CNY", "BTS"],
        ["CNY", "USD"],
        ["CNY", "YOYOW"],
        ["CNY", "OCT"],
        ["CNY", "HONEST.BTC"],
        ["CNY", "HONEST.USD"],
        ["CNY", "HONEST.BTCSHORT"],
        ["CNY", "HONEST.USDSHORT"],
        ["CNY", "HONEST.CNY"],
        ["CNY", "HERTZ"],
        ["CNY", "URTHR"],
        ["CNY", "SKULD"],
        ["CNY", "VERTHANDI"],
        ["BTS", "RUBLE"],
        ["BTS", "HERO"],
        ["BTS", "OCT"],
        ["BTS", "SILVER"],
        ["BTS", "GOLD"],
        ["BTS", "XBTSX.BTC"],
        ["BTS", "XBTSX.ETH"],
        ["BTS", "XBTSX.EUR"],
        ["BTS", "XBTSX.RUB"],
        ["BTS", "XBTSX.STH"],
        ["BTS", "XBTSX.TUSD"],
        ["BTS", "XBTSX.WAVES"],
        ["BTS", "XBTSX.USD"],
        ["BTS", "XBTSX.USDC"],
        ["BTS", "XBTSX.USDN"],
        ["BTS", "XBTSX.USDT"],
        ["BTS", "HERTZ"],
        ["EVRAZ", "BTS"],
        ["EVRAZ", "RUBLE"],
        ["EVRAZ", "EUR"],
        ["EVRAZ", "CNY"],
        ["EVRAZ", "HONEST.USD"],
        ["EVRAZ", "RUDEX.BTC"],
        ["EVRAZ", "XBTSX.BTC"],
        ["EVRAZ", "XBTSX.STH"],
        ["EVRAZ", "CRUDE.NGN"][("BTS", "HONEST")],
        ["BTS", "HONEST.MONEY"],
        ["BTS", "HONEST.AGORISM"],
        ["BTS", "HONEST.DEV"],
        ["BTS", "HONEST.CNY"],
        ["BTS", "HONEST.USD"],
        ["BTS", "HONEST.BTC"],
        ["BTS", "HONEST.XAU"],
        ["BTS", "HONEST.XAG"],
        ["BTS", "HONEST.ETH"],
        ["BTS", "HONEST.XRP"],
        ["BTS", "HONEST.XRP1"],
        ["BTS", "HONEST.ETH1"],
        ["BTS", "HONEST.USDSHORT"],
        ["BTS", "HONEST.BTCSHORT"],
        ["BTS", "HONEST.ADA"],
        ["BTS", "HONEST.DOT"],
        ["BTS", "HONEST.LTC"],
        ["BTS", "HONEST.SOL"],
        ["BTS", "HONEST.XMR"],
        ["BTS", "HONEST.ATOM"],
        ["BTS", "HONEST.XLM"],
        ["BTS", "HONEST.ALGO"],
        ["BTS", "HONEST.FIL"],
        ["BTS", "HONEST.EOS"],
        ["BTS", "HONEST.RUB"],
        ["BTS", "HONEST.EUR"],
        ["BTS", "HONEST.GBP"],
        ["BTS", "HONEST.JPY"],
        ["BTS", "HONEST.KRW"],
        ["BTS", "HONEST.ADASHORT"],
        ["BTS", "HONEST.DOTSHORT"],
        ["BTS", "HONEST.LTCSHORT"],
        ["BTS", "HONEST.SOLSHORT"],
        ["BTS", "HONEST.XMRSHORT"],
        ["BTS", "HONEST.ATOMSHORT"],
        ["BTS", "HONEST.XLMSHORT"],
        ["BTS", "HONEST.ALGOSHORT"],
        ["BTS", "HONEST.FILSHORT"],
        ["BTS", "HONEST.EOSSHORT"],
        ["BTS", "HONEST.RUBSHORT"],
        ["BTS", "HONEST.EURSHORT"],
        ["BTS", "HONEST.GBPSHORT"],
        ["BTS", "HONEST.JPYSHORT"],
        ["BTS", "HONEST.KRWSHORT"],
        ["BTS", "HONEST.XRPSHORT"],
        ["BTS", "HONEST.ETHSHORT"],
        ["BTS", "HONEST.XAUSHORT"],
        ["BTS", "HONEST.XAGSHORT"],
        ["BTS", "HONEST.CNYSHORT"],
        ["BTS", "IOB.XRP"],
        ["BTS", "IOB.XLM"],
        ["BTS", "HERTZ"],
        ["BTS", "URTHR"],
        ["BTS", "SKULD"],
        ["BTS", "VERTHANDI"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    if (_isTestnet()) {
        return [];
    }
    return ["XBTSX.", "GDEX.", "HONEST.", "IOB.", "PIRATE."];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "XBTSX.", "bit"
    return [];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    const allowedGateways = [
        "TRADE",
        "OPEN", // keep to display the warning icon, permanently disabled in gateways.js
        "RUDEX", // keep to display the warning icon, permanently disabled in gateways.js
        "GDEX",
        "PIRATE",
        "XBTSX",
        "IOB",
        "CITADEL", // keep to display the warning icon, permanently disabled in gateways.js
        "BRIDGE", // keep to display the warning icon, permanently disabled in gateways.js
        "SPARKDEX" // keep to display the warning icon, permanently disabled in gateways.js
    ];
    if (!gateway) {
        // answers the question: are any allowed?
        return allowedGateways.length > 0;
    }
    return allowedGateways.indexOf(gateway) >= 0;
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}

export function getConfigurationAsset() {
    let assetSymbol = null;
    if (_isTestnet()) {
        assetSymbol = "NOTIFICATIONS";
    } else {
        assetSymbol = "TEST";
    }
    // explanation will be parsed out of the asset description (via split)
    return {
        symbol: assetSymbol,
        explanation:
            "This asset is used for decentralized configuration of the BitShares UI placed under bitshares.org."
    };
}

export function getHiveNewsTag() {
    return "bitshares";
}
