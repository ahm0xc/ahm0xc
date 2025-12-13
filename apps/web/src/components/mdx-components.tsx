export const mdxComponents = {
  hr: () => <hr className="my-8 border-t border-foreground/5" />,
  Image,
};

interface ImageProps {
  src: string;
}

function Image(props: ImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={props.src} className="rounded-2xl" alt="" />;
}
