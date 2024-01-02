import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LoadingImageProps {
   src: string;
   alt?: string;
   w?: string;
   h?: string;
   style?: Record<string, string | number>;
}

function LazyLoadingImage(props: LoadingImageProps) {
   const { src, alt, w, h, style } = props;

   return (
      <LazyLoadImage
         src={src} // use normal <img> attributes as props
         alt={alt}
         width={w || '100%'}
         height={h || '100%'}
         style={style}
      />
   );
}

export default LazyLoadingImage;
