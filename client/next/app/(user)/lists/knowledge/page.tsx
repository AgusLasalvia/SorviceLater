import { KnowledgeCard } from "@/components/Knowledge/KnowledgeCard/KnowledgeCard";
import "./kblist.css";

const Page = async () => {
  return (
    <div className="content">
      <p className="title">Knowledge List</p>
      <div className="resultsWrapper">
        <KnowledgeCard />
      </div>
    </div>
  );
};

export default Page;
