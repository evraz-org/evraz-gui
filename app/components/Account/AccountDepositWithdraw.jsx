import React from "react";
import {connect} from "alt-react";
import accountUtils from "common/account_utils";
import {updateGatewayBackers} from "common/gatewayUtils";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import HelpContent from "../Utility/HelpContent";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import GatewayStore from "stores/GatewayStore";
import AccountImage from "../Account/AccountImage";
import PiratecashGateway from "../DepositWithdraw/piratecash/PiratecashGateway";
import XbtsFiat from "../DepositWithdraw/XbtsFiat";
import XbtsxGateway from "../DepositWithdraw/xbtsx/XbtsxGateway";
import PropTypes from "prop-types";
import DepositModal from "../Modal/DepositModal";
import WithdrawModal from "../Modal/WithdrawModalNew";
import TranslateWithLinks from "../Utility/TranslateWithLinks";

class AccountDepositWithdraw extends React.Component {
    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
        contained: PropTypes.bool
    };

    static defaultProps = {
        contained: false
    };

    constructor(props) {
        super();
        this.state = {
            depositModalVisible: false,
            withdrawModalVisible: false,
            activeService: 0,
            piratecashService: props.viewSettings.get(
                "piratecashService",
                "gateway"
            ),
            xbtsxService: props.viewSettings.get("xbtsxService", "gateway")
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.account !== this.props.account ||
            nextProps.servicesDown !== this.props.servicesDown ||
            nextState.piratecashService !== this.state.piratecashService ||
            nextState.xbtsxService !== this.state.xbtsxService ||
            nextState.activeService !== this.state.activeService ||
            nextState.depositModalVisible !== this.state.depositModalVisible ||
            nextState.withdrawModalVisible !== this.state.withdrawModalVisible
        );
    }

    UNSAFE_componentWillMount() {
        accountUtils.getFinalFeeAsset(this.props.account, "transfer");
    }

    togglePiratecashService(service) {
        this.setState({
            piratecashService: service
        });

        SettingsActions.changeViewSetting({
            piratecashService: service
        });
    }

    toggleXbtsxService(service) {
        this.setState({
            xbtsxService: service
        });

        SettingsActions.changeViewSetting({
            xbtsxService: service
        });
    }

    onSetService(e) {
        //let index = this.state.services.indexOf(e.target.value);
        this.setState({
            activeService: parseInt(e.target.value)
        });

        SettingsActions.changeViewSetting({
            activeService: parseInt(e.target.value)
        });
    }

    renderServices(piratecashGatewayCoins, xbtsxGatewayCoins) {
        //let services = ["Openledger (OPEN.X)", "BlockTrades (TRADE.X)", "Transwiser", "BitKapital"];
        let serList = [];
        let {account} = this.props;
        let {piratecashService, xbtsxService} = this.state;
        serList.push({
            name: "Pirate DEX",
            identifier: "PIRATE",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.togglePiratecashService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    piratecashService === "gateway"
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {piratecashService === "gateway" &&
                    piratecashGatewayCoins.length ? (
                        <PiratecashGateway
                            account={account}
                            coins={piratecashGatewayCoins}
                        />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "XBTS Native Chains",
            identifier: "XBTSX",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleXbtsxService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    xbtsxService === "gateway"
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                            <li
                                onClick={this.toggleXbtsxService.bind(
                                    this,
                                    "fiat"
                                )}
                                className={
                                    xbtsxService === "fiat" ? "is-active" : ""
                                }
                            >
                                <a>Fiat</a>
                            </li>
                        </ul>
                    </div>

                    {xbtsxService === "gateway" && xbtsxGatewayCoins.length ? (
                        <XbtsxGateway
                            account={account}
                            coins={xbtsxGatewayCoins}
                        />
                    ) : null}

                    {xbtsxService === "fiat" ? (
                        <XbtsFiat
                            viewSettings={this.props.viewSettings}
                            account={account}
                        />
                    ) : null}
                </div>
            )
        });

        return serList;
    }

    render() {
        let {account, servicesDown} = this.props;
        let {activeService} = this.state;

        let piratecashGatewayCoins = this.props.piratecashBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let xbtsxGatewayCoins = this.props.xbtsxBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let services = this.renderServices(
            piratecashGatewayCoins,
            xbtsxGatewayCoins
        );

        const serviceNames = [];
        let options = services.map((services_obj, index) => {
            serviceNames.push(services_obj.identifier);
            return (
                <option key={index} value={index}>
                    {services_obj.name}
                </option>
            );
        });

        const currentServiceName = serviceNames[activeService];
        const currentServiceDown = servicesDown.get(currentServiceName);

        return (
            <div
                className={
                    this.props.contained ? "grid-content" : "grid-container"
                }
            >
                <div
                    className={this.props.contained ? "" : "grid-content"}
                    style={{paddingTop: "2rem"}}
                >
                    <div className="grid-block vertical medium-horizontal no-margin no-padding">
                        <div style={{paddingBottom: "1rem"}}>
                            <DepositModal
                                ref="deposit_modal"
                                modalId="deposit_modal_new"
                                account={this.props.currentAccount}
                                backedCoins={this.props.backedCoins}
                                hideModal={() =>
                                    this.setState({depositModalVisible: false})
                                }
                                visible={this.state.depositModalVisible}
                            />
                            <WithdrawModal
                                ref="withdraw_modal"
                                modalId="withdraw_modal_new"
                                backedCoins={this.props.backedCoins}
                                hideModal={() =>
                                    this.setState({withdrawModalVisible: false})
                                }
                                visible={this.state.withdrawModalVisible}
                            />
                            <TranslateWithLinks
                                string="gateway.phase_out_warning"
                                keys={[
                                    {
                                        arg: "deposit_modal_link",
                                        value: (
                                            <a
                                                onClick={() =>
                                                    this.setState({
                                                        depositModalVisible: true
                                                    })
                                                }
                                            >
                                                <Translate content="modal.deposit.submit" />
                                            </a>
                                        )
                                    },
                                    {
                                        arg: "withdraw_modal_link",
                                        value: (
                                            <a
                                                onClick={() =>
                                                    this.setState({
                                                        withdrawModalVisible: true
                                                    })
                                                }
                                            >
                                                <Translate content="modal.withdraw.submit" />
                                            </a>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <Translate content="gateway.title" component="h2" />
                    <div className="grid-block vertical medium-horizontal no-margin no-padding">
                        <div className="medium-6 show-for-medium">
                            <HelpContent
                                path="components/DepositWithdraw"
                                section="deposit-short"
                            />
                        </div>
                        <div className="medium-5 medium-offset-1">
                            <HelpContent
                                account={account.get("name")}
                                path="components/DepositWithdraw"
                                section="receive"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="grid-block vertical medium-horizontal no-margin no-padding">
                            <div className="medium-6 small-order-2 medium-order-1">
                                <Translate
                                    component="label"
                                    className="left-label"
                                    content="gateway.service"
                                />
                                <select
                                    onChange={this.onSetService.bind(this)}
                                    className="bts-select"
                                    value={activeService}
                                >
                                    {options}
                                </select>
                                {currentServiceDown ? (
                                    <Translate
                                        style={{
                                            color: "red",
                                            marginBottom: "1em",
                                            display: "block"
                                        }}
                                        content={`gateway.unavailable_${currentServiceName}`}
                                    />
                                ) : null}
                            </div>
                            <div
                                className="medium-5 medium-offset-1 small-order-1 medium-order-2"
                                style={{paddingBottom: 20}}
                            >
                                <Translate
                                    component="label"
                                    className="left-label"
                                    content="gateway.your_account"
                                />
                                <div className="inline-label">
                                    <AccountImage
                                        size={{height: 40, width: 40}}
                                        account={account.get("name")}
                                        custom_image={null}
                                    />
                                    <input
                                        type="text"
                                        value={account.get("name")}
                                        placeholder={null}
                                        disabled
                                        onChange={() => {}}
                                        onKeyDown={() => {}}
                                        tabIndex={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="grid-content no-padding"
                        style={{paddingTop: 15}}
                    >
                        {currentServiceDown
                            ? null
                            : activeService && services[activeService]
                            ? services[activeService].template
                            : services[0].template}
                    </div>
                </div>
            </div>
        );
    }
}
AccountDepositWithdraw = BindToChainState(AccountDepositWithdraw);

class DepositStoreWrapper extends React.Component {
    UNSAFE_componentWillMount() {
        updateGatewayBackers();
    }

    render() {
        return <AccountDepositWithdraw {...this.props} />;
    }
}

export default connect(DepositStoreWrapper, {
    listenTo() {
        return [AccountStore, SettingsStore, GatewayStore];
    },
    getProps() {
        return {
            currentAccount:
                AccountStore.getState().currentAccount ||
                AccountStore.getState().passwordAccount,
            account: AccountStore.getState().currentAccount,
            viewSettings: SettingsStore.getState().viewSettings,
            backedCoins: GatewayStore.getState().backedCoins,
            openLedgerBackedCoins: GatewayStore.getState().backedCoins.get(
                "OPEN",
                []
            ),
            rudexBackedCoins: GatewayStore.getState().backedCoins.get(
                "RUDEX",
                []
            ),
            bitsparkBackedCoins: GatewayStore.getState().backedCoins.get(
                "SPARKDEX",
                []
            ),
            blockTradesBackedCoins: GatewayStore.getState().backedCoins.get(
                "TRADE",
                []
            ),
            citadelBackedCoins: GatewayStore.getState().backedCoins.get(
                "CITADEL",
                []
            ),
            piratecashBackedCoins: GatewayStore.getState().backedCoins.get(
                "PIRATE",
                []
            ),
            xbtsxBackedCoins: GatewayStore.getState().backedCoins.get(
                "XBTSX",
                []
            ),
            servicesDown: GatewayStore.getState().down || {}
        };
    }
});
