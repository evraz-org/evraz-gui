import React, {Component} from "react";
import Immutable from "immutable";
import cname from "classnames";
import PropTypes from "prop-types";
import counterpart from "counterpart";
import {Form, Input} from "bitshares-ui-style-guide";
import Icon from "../Icon/Icon";

const FormItem = Form.Item;

export default class PasswordConfirm extends Component {
    static propTypes = {
        // Called everytime a valid password is provided and matches a confirmed password
        onValid: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            password: "",
            confirm: "",
            errors: Immutable.Map(),
            // An empty form has no errors but is still invaid
            valid: false,
            passwordVisible: false,
            confirmPasswordVisible: false
        };
    }

    componentDidMount() {
        if (this.firstPassword) {
            this.firstPassword.focus();
        }
    }

    getInputNode = node => {
        this.firstPassword = node;
    };

    formChange(event) {
        let key =
            event.target.id === "current-password" ? "password" : "confirm";
        let state = {};
        state[key] = event.target.value;
        this.setState(state, this.validate);
    }

    validate(state = this.state) {
        let {password, confirm} = state;
        confirm = confirm.trim();
        password = password.trim();

        let errors = Immutable.Map();
        // Don't report until typing begins
        if (password.length !== 0 && password.length < 8)
            errors = errors.set(
                "password_length",
                "Password must be 8 characters or more"
            );

        // Don't report it until the confirm is populated
        if (password !== "" && confirm !== "" && password !== confirm)
            errors = errors.set("password_match", "Passwords do not match");

        let valid = password.length >= 8 && password === confirm;
        this.setState({errors, valid});
        this.props.onValid(valid ? password : null);
    }

    renderPasswordEye() {
        const {passwordVisible} = this.state;
        return !passwordVisible ? (
            <span
                className="input-password-eye"
                style={{marginRight: "170px", marginTop: "-25px"}}
                onClick={() => this.setState({passwordVisible: true})}
            >
                <Icon name="eye" className="eye-icon icon-opacity" />
            </span>
        ) : (
            <span
                className="input-password-eye"
                style={{marginRight: "170px", marginTop: "-25px"}}
                onClick={() => this.setState({passwordVisible: false})}
            >
                <Icon name="eye-striked" className="eye-icon icon-opacity" />
            </span>
        );
    }

    renderConfirmPasswordEye(confirmMatch) {
        const {confirmPasswordVisible} = this.state;
        return !confirmPasswordVisible ? (
            <span
                className="confirm-password-eye"
                style={{marginRight: "170px", marginTop: "-25px"}}
                onClick={() => this.setState({confirmPasswordVisible: true})}
            >
                <Icon name="eye" className="eye-icon icon-opacity" />
            </span>
        ) : (
            <span
                className="confirm-password-eye"
                style={{marginRight: "170px", marginTop: "-25px"}}
                onClick={() => this.setState({confirmPasswordVisible: false})}
            >
                <Icon name="eye-striked" className="eye-icon icon-opacity" />
            </span>
        );
    }

    render() {
        const {password, confirm, errors} = this.state;
        let {newPassword} = this.props;
        let tabIndex = 1;

        return (
            <div className={cname({"has-error": errors.size})}>
                <FormItem
                    label={counterpart.translate(
                        newPassword ? "wallet.new_password" : "wallet.password"
                    )}
                >
                    <section>
                        <Input
                            type={
                                !this.state.passwordVisible
                                    ? "password"
                                    : "text"
                            }
                            id="current-password"
                            autoComplete="current-password"
                            ref={this.getInputNode()}
                            onChange={this.formChange.bind(this)}
                            value={password}
                            tabIndex={tabIndex++}
                        />
                        {this.renderPasswordEye()}
                    </section>
                </FormItem>

                <FormItem
                    label={counterpart.translate(
                        newPassword ? "wallet.new_confirm" : "wallet.confirm"
                    )}
                >
                    <section className={cname({"has-error": errors.size})}>
                        <Input
                            type={
                                !this.state.confirmPasswordVisible
                                    ? "password"
                                    : "text"
                            }
                            id="new-password"
                            autoComplete="new-password"
                            onChange={this.formChange.bind(this)}
                            value={confirm}
                            tabIndex={tabIndex++}
                        />
                        {this.renderConfirmPasswordEye()}
                        <div>
                            {errors.get("password_match") ||
                                errors.get("password_length")}
                        </div>
                    </section>
                </FormItem>

                {this.props.children}
                <br />
            </div>
        );
    }
}
