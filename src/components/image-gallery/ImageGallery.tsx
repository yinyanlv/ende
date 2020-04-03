import React, {useCallback} from 'react';
import ReactImageGallery from 'react-image-gallery';
import {ImageMagnify} from '@/components/image-magnify';
import 'react-image-gallery/styles/css/image-gallery-no-icon.css';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
    items?: any[];
    noImageUrl?: string;
}

function ImageGallery(props: ImageGalleryProps) {

    const renderImageMagnify = useCallback((item) => {
        return <ImageMagnify smallImageSrc={item.thumbnail} largeImageSrc={item.original} portalId={'image-magnify-portal'}/>;
    }, []);

    const handleThumbnailError = useCallback((e) => {
        e.target.src = '/images/pure_no_pic.png';
    }, []);

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
                            onThumbnailError={handleThumbnailError}
                        />
                        <div className="image-magnify-portal" id="image-magnify-portal"></div>
                    </>
                ) : (
                    <div className="no-image">
                        <img src={props.noImageUrl ? props.noImageUrl : '/images/no_pic.png'}  alt=""/>
                    </div>
                )
            }
        </div>
    );
}

export default React.memo(ImageGallery);
