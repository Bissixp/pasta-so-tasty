import { useEffect, useState } from 'react';
import { fetchUpload } from '../services/requests';

const ImageLoader: React.FC<{ photo: string; alt: string; width: string; height: string }> = ({ photo, alt, width, height }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const loadImage = async (photo: string) => {
    try {
      const imageUrl = await fetchUpload(photo);
      return imageUrl;
    } catch (error: any) {
      return 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';
    }
  };
  useEffect(() => {
    const loadPhoto = async () => {
      const imageUrl = await loadImage(photo);
      setImageUrl(imageUrl);
    };

    loadPhoto();
  }, [photo]);

  return imageUrl ? <img src={imageUrl} alt={alt} width={width} height={height} /> : <p>Carregando foto...</p>;
};

export default ImageLoader;