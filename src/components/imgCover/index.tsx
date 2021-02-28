// - Import react components
import SvgImage from '@material-ui/icons/Image';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IImgCoverComponentProps } from './IImgCoverComponentProps';
import { IImgCoverComponentState } from './IImgCoverComponentState';

// - Import app components

// - Import API

// - Import actions
/**
 * Create component class
 */
export class ImgCoverComponent extends Component<IImgCoverComponentProps & WithTranslation, IImgCoverComponentState> {
    styles = {
        cover: {
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
        },
        loding: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            position: 'relative',
            fontWeight: 400,
        },
        loadingContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        loadingImage: {
            width: '50px',
            height: '50px',
        },
    };

    /**
     * Component constructor
     */
    constructor(props: IImgCoverComponentProps & WithTranslation) {
        super(props);

        // Defaul state
        this.state = {
            isImageLoaded: false,
        };

        // Binding functions to `this`
        this.handleLoadImage = this.handleLoadImage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Will be called on loading image
     */
    handleLoadImage = () => {
        this.setState({
            isImageLoaded: true,
        });
    };

    /**
     * Handle click
     */
    handleClick = (event: any) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(event);
        }
    };

    /**
     * Reneder component DOM
     */
    render() {
        const { src, style, t, className } = this.props;
        const { isImageLoaded } = this.state;

        return (
            <div>
                <div
                    onClick={this.handleClick}
                    className={className}
                    style={
                        !isImageLoaded
                            ? { display: 'none' }
                            : (Object.assign(
                                  {},
                                  this.styles.cover,
                                  {
                                      backgroundImage: 'url(' + (src || '') + ')',
                                      width: this.props.width,
                                      height: this.props.height,
                                      borderRadius: this.props.borderRadius,
                                  },
                                  style,
                              ) as any)
                    }
                >
                    {this.props.children}
                </div>
                <div style={isImageLoaded ? { display: 'none' } : (this.styles.loding as any)}>
                    <div style={this.styles.loadingContent as any}>
                        <SvgImage style={this.styles.loadingImage} />
                        <div>{t('image.notLoaded')}</div>
                    </div>
                </div>
                <img alt="..." onLoad={this.handleLoadImage} src={src || ''} style={{ display: 'none' }} />
            </div>
        );
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = () => {
    return {};
};

/**
 * Map state to props
 */
const mapStateToProps = () => {
    return {};
};

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ImgCoverComponent);

export default connect<{}, {}, any, any>(mapStateToProps, mapDispatchToProps)(translateWrapper);
