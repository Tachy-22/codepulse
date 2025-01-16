"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "@/lib/redux/jsTsSlice";
import { RootState } from "@/lib/redux/store";
import CodeBlock from "./ui/code-block";

const CodeTabs = ({ tabs }: { tabs: TabData[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const isTypeScript = useSelector(
    (state: RootState) => state.jsTs.isTypeScript
  );
  console.log({ tabs });

  const filteredTabs = tabs.filter((tab) => {
    const extension = tab.title.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "js":
      case "jsx":
        return !isTypeScript;
      case "ts":
      case "tsx":
        return isTypeScript;
      default:
        return true;
    }
  });

  // Reset active tab if it's out of bounds after filtering
  useEffect(() => {
    if (activeTab >= filteredTabs.length) {
      setActiveTab(0);
    }
  }, [isTypeScript, filteredTabs.length, activeTab]);

  const getLanguageFromTitle = (title: string): string => {
    const extension = title.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "js":
      case "jsx":
        return "jsx";
      case "ts":
      case "tsx":
        return "typescript";
      case "py":
        return "python";
      case "java":
        return "java";
      case "cpp":
      case "c":
        return "cpp";
      default:
        return "plaintext";
    }
  };

  console.log({ filteredTabs, tabs });

  return (
    <div className="w-full lg:max-w-3xl lg:w-[48rem]  border-gray-300 dark:border-gray-700 rounded-[0.25rem]  bg-background shadow mx-auto ">
      <div className="relative ">
        <div className="relative bg-muted/50  rounded-b-lg h-full">
          <div className="mx-auto h-full  ">
            <CodeBlock
              filename={filteredTabs[activeTab].title}
              highlightLines={[9, 13, 14, 18]}
              tabs={filteredTabs}
              language={getLanguageFromTitle(filteredTabs[activeTab].title)}
            />
          </div>
          <div className="absolute top-[1.25rem] right-[3rem] flex gap-2">
            <button
              onClick={() => dispatch(toggleLanguage())}
              className={`${
                isTypeScript ? "bg-orange-500" : "bg-blue-500"
              }  text-white p-1 rounded-[0.25rem] text-xs`}
            >
              {isTypeScript ? "TS" : "JS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTabs;
