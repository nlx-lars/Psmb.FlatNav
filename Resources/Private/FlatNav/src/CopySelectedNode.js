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
    copy: actions.CR.Nodes.copy
})
export default class CopySelectedNode extends PureComponent {
    static propTypes = {
        node: PropTypes.object,
        className: PropTypes.string,
        copy: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        i18nRegistry: PropTypes.object.isRequired
    };

    handleCopySelectedNodeClick = () => {
        const {node, copy} = this.props;
        copy($get('contextPath', node));
    };

    render() {
        const {className, disabled, i18nRegistry} = this.props;

        return (
            <IconButton
                className={className}
                disabled={disabled}
                onClick={this.handleCopySelectedNodeClick}
                icon="copy"
                hoverStyle="clean"
                title={i18nRegistry.translate('copy')}
            />
        );
    }
}
