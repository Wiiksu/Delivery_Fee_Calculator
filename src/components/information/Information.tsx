import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { items } from "../../helpers/InformationItems";

export default function Information() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    if (expanded.includes(title)) {
      setExpanded(expanded.filter((otherTitles) => otherTitles !== title));
    } else {
      setExpanded([...expanded, title]);
    }
  };

  const collapseAllSubitems = () => {
    setExpanded([]);
  };

  return (
    <section className="bg-purple-400 text-purple-50 py-3 px-4 rounded shadow-lg h-fit w-[22rem] md:w-[27rem]">
      {items.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => {
              toggleExpand(item.title);
              if (expanded.includes(item.title)) {
                collapseAllSubitems();
              }
            }}
            className="font-semibold flex items-center gap-2 cursor-pointer select-none w-fit"
          >
            {expanded.includes(item.title) ? (
              <FaMinus size={13} />
            ) : (
              <FaPlus size={13} />
            )}
            <span
              data-testid="mainItemTitle"
              className="translate-y-[-1px] text-lg"
            >
              {item.title}
            </span>
          </div>
          {expanded.includes(item.title) && (
            <ul className="translate-x-2">
              {item.subinformation.map((subItem, subIndex) => (
                <div className="flex flex-col" key={subIndex}>
                  <li
                    onClick={() => toggleExpand(subItem.title)}
                    className="font-semibold flex items-center gap-2 cursor-pointer select-none w-fit"
                  >
                    {expanded.includes(subItem.title) ? (
                      <FaMinus size={10} />
                    ) : (
                      <FaPlus size={10} />
                    )}
                    <span className="translate-y-[-1px] text-base">
                      {subItem.title}
                    </span>
                  </li>
                  {expanded.includes(subItem.title) && (
                    <p className="bg-purple-500 text-sm font-semibold py-2 px-4 rounded break-words my-1 translate-x-1 mr-5">
                      {subItem.info}
                    </p>
                  )}
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
