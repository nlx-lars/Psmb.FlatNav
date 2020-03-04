import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import {neos} from '@neos-project/neos-ui-decorators';
import {IconButton} from '@neos-project/react-ui-components';
import {selectors, actions} from '@neos-project/neos-ui-redux-store';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@connect($transform({
    node: selectors.CR.Nodes.focusedSelector
}), {
    paste: actions.CR.Nodes.paste
})
export default class PasteSelectedNode extends PureComponent {
    static propTypes = {
        node: PropTypes.object,
        className: PropTypes.string,
        commitPaste: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        i18nRegistry: PropTypes.object.isRequired
    };

    handlePasteSelectedNodeClick = () => {
        const {node, paste} = this.props;
        paste($get('contextPath', node));
    };

    render() {
        const {className, disabled, i18nRegistry} = this.props;

        return (
            <IconButton
                className={className}
                disabled={disabled}
                onClick={this.handlePasteSelectedNodeClick}
                icon="paste"
                hoverStyle="clean"
                title={i18nRegistry.translate('paste')}
            />
        );
    }
}
