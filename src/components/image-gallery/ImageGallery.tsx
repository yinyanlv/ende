import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import ImageMagnify from 'react-image-magnify';
import 'react-image-gallery/styles/css/image-gallery-no-icon.css';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
    items?: any[];
    noImageUrl?: string;
}

function ImageGallery(props: ImageGalleryProps) {

    const renderImageMagnify = (item) => {

        return (
            <div className={'image-magnify-wrapper'}>
                <ImageMagnify {...{
                    smallImage: {
                        isFluidWidth: true,
                        src: item.thumbnail,
                    },
                    largeImage: {
                        src: item.original,
                        width: 1200,
                        height: 1200
                    },
                    enlargedImagePortalId: 'image-magnify-portal'
                }} />
            </div>
        );
    };

    return (
        <div className={styles.imageGalleryBox}>
            {
                (props.items && props.items.length > 0) ? (
                    <>
                        <ReactImageGallery
                            thumbnailPosition={'bottom'}
                            useBrowserFullscreen={false}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            items={props.items}
                            renderItem={renderImageMagnify}
                            slideDuration={200}
                        />
                        <div className="image-magnify-portal" id="image-magnify-portal"></div>
                    </>
                ) : (
                    <div className="no-image">
                        <img src={props.noImageUrl ? props.noImageUrl : '/images/nopic.gif'}  alt=""/>
                    </div>
                )
            }
        </div>
    );
}

export default React.memo(ImageGallery);
