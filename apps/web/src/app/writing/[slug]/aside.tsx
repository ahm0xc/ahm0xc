import { Toc } from "~/components/toc";
import { TocItem } from "~/lib/toc-utils";

export default function Aside({ toc }: { toc: TocItem[] }) {
  return (
    <aside className="max-w-[350px] pt-72 lg:pl-8">
      <div className="sticky top-10">
        <Toc items={toc} />
      </div>
    </aside>
  );
}
