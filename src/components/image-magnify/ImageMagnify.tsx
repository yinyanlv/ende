import React, {useState, useCallback} from 'react';
import ReactImageMagnify from 'react-image-magnify';
import styles from './ImageMagnify.module.scss';

interface ImageMagnifyProps {
    smallImageSrc: string;
    largeImageSrc: string;
    portalId: string;
}

function ImageMagnify(props: ImageMagnifyProps) {
    const [config, setConfig] = useState({
        width: 1000,
        height: 750
    });

    const handleMagnifyError = useCallback((e) => {
        e.target.src = '/images/no_pic.png';
    }, []);

    const handleMagnifyLoad = useCallback((e) => {

        if (e && e.target) {
            setConfig({
                width: e.target.naturalWidth || 1000,
                height: e.target.naturalHeight || 750
            });
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        const node = document.getElementById(props.portalId);
        if (node) {
            node.style.display = 'flex';
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const node = document.getElementById(props.portalId);
        if (node) {
            node.style.display = 'none';
        }
    }, []);

    return (
        <div className={styles.imageMagnifyWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ReactImageMagnify {...{
                smallImage: {
                    isFluidWidth: true,
                    src: props.smallImageSrc,
                    onError: handleMagnifyError
                },
                largeImage: {
                    src: props.largeImageSrc,
                    onError: handleMagnifyError,
                    width: config.width,
                    height: config.height,
                    onLoad: handleMagnifyLoad
                },
                enlargedImagePortalId: props.portalId,
            }} />
        </div>
    );
}

export default React.memo(ImageMagnify);
