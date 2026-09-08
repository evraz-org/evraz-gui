import React from "react";
import counterpart from "counterpart";
import {DepositModalContent} from "./DepositModal";
import {WithdrawModalContentNew} from "./WithdrawModalNew";
import {Modal, Button, Tabs} from "bitshares-ui-style-guide";

class GatewaysModal extends React.Component {
    render() {
        return (
            <Modal
                destroyOnClose={true}
                title={counterpart.translate("gateways")}
                id={this.props.modalId}
                className={this.props.modalId}
                onCancel={this.props.hideModal}
                overlay={true}
                footer={[
                    <Button key="cancel" onClick={this.props.hideModal}>
                        {counterpart.translate("modal.close")}
                    </Button>
                ]}
                visible={this.props.visible}
                noCloseBtn
                width={700}
            >
                <Tabs defaultActiveKey="deposit">
                    <Tabs.TabPane
                        tab={counterpart.translate("deposit")}
                        key="deposit"
                    >
                        <DepositModalContent
                            hideModal={this.props.hideModal}
                            {...this.props}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={counterpart.translate("withdraw")}
                        key="withdraw"
                    >
                        <WithdrawModalContentNew
                            {...this.props}
                            hideModal={this.props.hideModal}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        );
    }
}

export default GatewaysModal;
