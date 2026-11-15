export const mdxComponents = {
  hr: () => <hr className="my-8 border-t border-foreground/5" />,
  Image,
};

interface ImageProps {
  src: string;
}

function Image(props: ImageProps) {
  return <img src={props.src} className="rounded-2xl" alt="" />;
}
