interface IPreviewImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string | undefined;
}

const PreviewImage = ({
  src,
  alt,
  width,
  height,
  className,
}: IPreviewImage) => {
  return (
    <>
      <img
        className={className}
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </>
  );
};

export default PreviewImage;
